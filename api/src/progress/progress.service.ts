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
}
