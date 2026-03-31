import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgressService {
    private readonly logger = new Logger(ProgressService.name);

    constructor(private readonly prisma: PrismaService) { }

    async trackActivity(userId: string, type: 'message' | 'time', amount: number) {
        this.logger.log(`Tracking activity for user ${userId}: ${type} +${amount}`);

        // Update User daily limits first if it's a message
        if (type === 'message') {
            const user = await this.prisma.user.findUnique({
                where: { clerkId: userId },
                select: { lastMessageAt: true, dailyMessagesCount: true }
            });

            if (user) {
                const now = new Date();
                const last = user.lastMessageAt ? new Date(user.lastMessageAt) : null;
                const isNewDay = !last || now.toDateString() !== last.toDateString();

                await this.prisma.user.update({
                    where: { clerkId: userId },
                    data: {
                        dailyMessagesCount: isNewDay ? amount : { increment: amount },
                        lastMessageAt: now
                    }
                });
            }
        }

        let progress = await this.prisma.progress.findUnique({
            where: { userId }
        });

        if (!progress) {
            progress = await this.prisma.progress.create({
                data: { userId }
            });
        }

        const updates: any = {};

        if (type === 'message') {
            updates.conversationCount = { increment: amount };
            updates.totalXp = { increment: amount * 10 }; // 10 XP per message
        } else if (type === 'time') {
            updates.practiceTime = { increment: amount };
            updates.totalXp = { increment: amount * 2 }; // 2 XP per minute
        }

        await this.prisma.progress.update({
            where: { userId },
            data: updates
        });
    }

    async getUserProgress(userId: string) {
        const progress = await this.prisma.progress.findUnique({
            where: { userId }
        });

        if (!progress) return { totalXp: 0, level: 1, practiceTime: 0, conversationCount: 0, wordsMastered: 0 };

        // Calculate level based on XP (simple formula)
        const level = Math.floor(progress.totalXp / 500) + 1;

        return {
            ...progress,
            level
        };
    }

    async getUserTheme(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { clerkId: userId },
            select: { theme: true }
        });
        return { theme: user?.theme || 'light' };
    }

    async setUserTheme(userId: string, theme: string) {
        await this.prisma.user.update({
            where: { clerkId: userId },
            data: { theme }
        });
        return { theme };
    }
}
