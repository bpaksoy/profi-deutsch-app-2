import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PhrasebookService {
    private readonly logger = new Logger(PhrasebookService.name);

    constructor(private readonly prisma: PrismaService) { }

    async savePhrase(userId: string, data: { german: string, context?: string, conversationId?: string, category?: string }) {
        this.logger.log(`Saving phrase for user ${userId}: ${data.german}`);

        // Ensure user exists (similar hack)
        await this.prisma.user.upsert({
            where: { id: userId },
            update: {},
            create: { id: userId, clerkId: userId, email: `user_${userId}@example.com` }
        }).catch(() => { });

        return this.prisma.phrase.create({
            data: {
                userId,
                german: data.german,
                context: data.context,
                conversationId: data.conversationId,
                category: data.category || 'General'
            }
        });
    }

    async getPhrases(userId: string, category?: string) {
        const where: any = { userId };
        if (category) {
            where.category = category;
        }
        return this.prisma.phrase.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });
    }
}