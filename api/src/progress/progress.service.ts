import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgressService {
    private readonly logger = new Logger(ProgressService.name);

    constructor(private readonly prisma: PrismaService) { }

    async trackActivity(userId: string, type: 'message' | 'time', amount: number) {
        this.logger.log(`Tracking activity for user ${userId}: ${type} +${amount}`);

        let progress = await this.prisma.progress.findUnique({
            where: { userId }
        });

        if (!progress) {
            // Ensure user exists first (hacky for now, assuming we have a user)
            // In a real app, we'd ensure the user is created on signup.
            // For this prototype, we might need to create a dummy user if not exists.
            const user = await this.prisma.user.upsert({
                where: { id: userId },
                update: {},
                create: { id: userId, clerkId: userId, email: `user_${userId}@example.com` } // Typo in clarkId? Schema said clerkId.
            }).catch(e => {
                // If user creation fails (e.g. clerkId constraint), try to find by id again or just log
                this.logger.error('Failed to ensure user exists', e);
                return null;
            });

            if (user) {
                progress = await this.prisma.progress.create({
                    data: { userId }
                });
            } else {
                return; // Cannot track progress without user
            }
        }

        const updates: any = {};

        if (type === 'message') {
            updates.conversationCount = { increment: amount };
            updates.totalXp = { increment: amount * 10 }; // 10 XP per message
        } else if (type === 'time') {
            updates.practiceTime = { increment: amount };
            updates.totalXp = { increment: amount * 2 }; // 2 XP per minute
        }

        updates.lastPracticeAt = new Date();

        await this.prisma.progress.update({
            where: { userId },
            data: updates
        });
    }

    async getUserProgress(userId: string) {
        const progress = await this.prisma.progress.findUnique({
            where: { userId }
        });

        if (!progress) return { totalXp: 0, level: 1, practiceTime: 0, conversationCount: 0 };

        // Calculate level based on XP
        const level = Math.floor(progress.totalXp / 500) + 1;

        return {
            ...progress,
            level
        };
    }
}
