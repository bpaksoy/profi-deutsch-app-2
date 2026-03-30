import { Controller, Post, Body, Req, UseGuards, Headers, RawBodyRequest } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @Post('create-checkout-session')
    @UseGuards(FirebaseAuthGuard)
    async createCheckoutSession(
        @GetUser() user: any,
        @Body('plan') plan: 'CLASSIC' | 'PRO' | 'ULTIMATE'
    ) {
        return this.paymentsService.createCheckoutSession(user.clerkId, plan);
    }

    @Post('create-portal-session')
    @UseGuards(FirebaseAuthGuard)
    async createPortalSession(@GetUser() user: any) {
        return this.paymentsService.createPortalSession(user.clerkId);
    }

    @Post('status') // Changed to Post for consistency with our GetUser decorator or use Get
    @UseGuards(FirebaseAuthGuard)
    async getStatus(@GetUser() user: any) {
        return this.paymentsService.getSubscriptionStatus(user.clerkId);
    }

    @Post('webhook')
    async handleWebhook(
        @Headers('stripe-signature') signature: string,
        @Req() req: RawBodyRequest<Request>
    ) {
        // Stripe requires the raw body for signature verification
        return this.paymentsService.handleWebhook(signature, (req as any).rawBody);
    }
}
