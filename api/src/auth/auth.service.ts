import { Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService implements OnModuleInit {
    constructor(private prisma: PrismaService) {}

    onModuleInit() {
        if (admin.apps.length === 0) {
            admin.initializeApp({
                projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'sigsag-6055d',
            });
        }
    }

    async validateToken(token: string) {
        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            const uid = decodedToken.uid;

            // Ensure user exists in our local DB
            await this.getOrCreateUser(uid, decodedToken.email, decodedToken.name);

            return {
                sub: uid,
                ...decodedToken,
            };
        } catch (e) {
            console.error('Firebase validation failed:', e);
            throw new UnauthorizedException('Invalid token');
        }
    }

    private async getOrCreateUser(clerkId: string, email?: string, name?: string) {
        let user = await this.prisma.user.findUnique({
            where: { clerkId },
        });

        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    clerkId,
                    email: email || `guest_${clerkId}@example.com`,
                    name: name || null,
                    planTier: 'FREE',
                    dailyMessagesCount: 0,
                },
            });
        }

        return user;
    }
}
