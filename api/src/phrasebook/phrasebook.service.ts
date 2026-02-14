import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PhrasebookService {
    private readonly logger = new Logger(PhrasebookService.name);

    constructor(private readonly prisma: PrismaService) { }

    async savePhrase(userId: string, data: { german: string, context?: string, conversationId?: string, category?: string }) {
        this.logger.log(`Saving phrase for user ${userId}: ${data.german}`);

        const categoryName = data.category || 'General';

        // Upsert Category
        await this.prisma.category.upsert({
            where: { name: categoryName },
            update: { phraseCount: { increment: 1 } },
            create: {
                name: categoryName,
                slug: categoryName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            }
        });

        return this.prisma.phrase.create({
            data: {
                userId, // This is Clerk ID
                german: data.german,
                context: data.context,
                conversationId: data.conversationId,
                category: categoryName
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

    async getCategories() {
        return this.prisma.category.findMany({
            orderBy: { name: 'asc' }
        });
    }
}