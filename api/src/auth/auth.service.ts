import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// 1. Add 'verifyToken' to the import list
import { createClerkClient, verifyToken } from '@clerk/backend'; 

@Injectable()
export class AuthService {
    private clerkClient;

    constructor(private prisma: PrismaService) {
        this.clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
    }

    async validateToken(token: string) {
        try {
            // 2. Change 'this.clerkClient.verifyToken' to the standalone 'verifyToken'
            const decoded = await verifyToken(token, {
                secretKey: process.env.CLERK_SECRET_KEY,
            });

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
            // This part stays the same as clerkClient.users still exists in v5
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