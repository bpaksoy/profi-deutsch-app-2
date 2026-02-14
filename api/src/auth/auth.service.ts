import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createClerkClient } from '@clerk/backend';

@Injectable()
export class AuthService {
    private clerkClient;

    constructor(private prisma: PrismaService) {
        this.clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
    }

    async validateToken(token: string) {
        try {
            const decoded = await this.clerkClient.verifyToken(token);

            // Ensure user exists in our local DB
            await this.getOrCreateUser(decoded.sub);

            return decoded;
        } catch (e) {
            console.error('Clerk validation failed:', e);
            throw new UnauthorizedException('Invalid token');
        }
    }

    private async getOrCreateUser(clerkId: string) {
        let user = await this.prisma.user.findUnique({
            where: { clerkId },
        });

        if (!user) {
            // Get user details from Clerk to populate our DB
            const clerkUser = await this.clerkClient.users.getUser(clerkId);
            user = await this.prisma.user.create({
                data: {
                    clerkId,
                    email: clerkUser.emailAddresses[0]?.emailAddress || '',
                    name: clerkUser.firstName ? `${clerkUser.firstName} ${clerkUser.lastName || ''}` : null,
                },
            });
        }

        return user;
    }
}
