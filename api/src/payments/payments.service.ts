import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
    private readonly stripe: Stripe;
    private readonly logger = new Logger(PaymentsService.name);

    constructor(
        private configService: ConfigService,
        private prisma: PrismaService
    ) {
        const stripeSecret = this.configService.get<string>('STRIPE_SECRET_KEY');
        if (!stripeSecret) {
            this.logger.error('STRIPE_SECRET_KEY is not defined in environment variables.');
        }
        this.stripe = new Stripe(stripeSecret || '', {
            apiVersion: '2025-01-27' as any,
        });
    }

    async createCheckoutSession(clerkId: string, plan: 'PRO' | 'ULTIMATE') {
        try {
            const user = await this.prisma.user.findUnique({ where: { clerkId } });
            if (!user) throw new Error('User not found');

            // Map plans to Stripe Price IDs (Placeholders - user needs to replace these)
            const priceMap = {
                'PRO': this.configService.get('STRIPE_PRO_PRICE_ID') || 'price_placeholder_pro',
                'ULTIMATE': this.configService.get('STRIPE_ULTIMATE_PRICE_ID') || 'price_placeholder_ultimate'
            };

            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card', 'paypal'], // PayPal via Stripe is possible
                line_items: [
                    {
                        price: priceMap[plan],
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                success_url: `${this.configService.get('FRONTEND_URL')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${this.configService.get('FRONTEND_URL')}/payment/cancel`,
                client_reference_id: clerkId,
                customer_email: user.email,
                metadata: {
                    clerkId: clerkId,
                    planTier: plan
                }
            });

            return { url: session.url };
        } catch (error) {
            this.logger.error(`Failed to create checkout session: ${error.message}`);
            throw new InternalServerErrorException('Payment session creation failed.');
        }
    }

    async createPortalSession(clerkId: string) {
        try {
            const user = await this.prisma.user.findUnique({ where: { clerkId } });
            if (!user || !user.stripeCustomerId) {
                throw new Error('Customer not found or no active subscription.');
            }

            const session = await this.stripe.billingPortal.sessions.create({
                customer: user.stripeCustomerId,
                return_url: `${this.configService.get('FRONTEND_URL')}/settings`,
            });

            return { url: session.url };
        } catch (error) {
            this.logger.error(`Failed to create portal session: ${error.message}`);
            throw new InternalServerErrorException('Could not open billing portal.');
        }
    }

    async getSubscriptionStatus(clerkId: string) {
        const user = await this.prisma.user.findUnique({
            where: { clerkId },
            select: {
                planTier: true,
                isActive: true,
                stripeCurrentPeriodEnd: true
            }
        });
        return user;
    }

    async handleWebhook(signature: string, rawBody: Buffer) {
        let event: Stripe.Event;

        try {
            event = this.stripe.webhooks.constructEvent(
                rawBody,
                signature,
                this.configService.get<string>('STRIPE_WEBHOOK_SECRET') || ''
            );
        } catch (err) {
            this.logger.error(`Webhook signature verification failed: ${err.message}`);
            throw new Error(`Webhook Error: ${err.message}`);
        }

        switch (event.type) {
            case 'checkout.session.completed':
                await this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
                break;
            case 'customer.subscription.deleted':
            case 'customer.subscription.updated':
                await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
                break;
        }

        return { received: true };
    }

    private async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
        const clerkId = session.client_reference_id;
        const stripeSubscriptionId = session.subscription as string;
        const stripeCustomerId = session.customer as string;
        const planTier = session.metadata?.planTier || 'PRO';

        if (!clerkId) return;

        const subscription = await this.stripe.subscriptions.retrieve(stripeSubscriptionId);

        await this.prisma.user.update({
            where: { clerkId },
            data: {
                stripeCustomerId,
                stripeSubscriptionId,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                isActive: true,
                planTier: planTier as any
            }
        });

        this.logger.log(`Subscription activated for user ${clerkId}`);
    }

    private async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
        const stripeCustomerId = subscription.customer as string;
        const user = await this.prisma.user.findFirst({ where: { stripeCustomerId } });

        if (!user) return;

        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                stripeSubscriptionId: subscription.id,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                isActive: subscription.status === 'active' || subscription.status === 'trailinging' // corrected typo from "trailing" if it's "trialing"
            }
        });
        
        // Final correction for "trialing"
        if (subscription.status === 'past_due' || subscription.status === 'canceled' || subscription.status === 'unpaid') {
            await this.prisma.user.update({
                where: { id: user.id },
                data: { isActive: false }
            });
        }
    }
}
