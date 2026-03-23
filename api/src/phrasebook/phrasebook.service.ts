import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const MAX_PHRASES = 100;

const DEFAULT_B2_CATEGORIES = [
    { name: 'Arbeit', slug: 'arbeit' },
    { name: 'Bildung', slug: 'bildung' },
    { name: 'Alltag', slug: 'alltag' },
    { name: 'Kultur', slug: 'kultur' },
    { name: 'Freizeit', slug: 'freizeit' },
];

@Injectable()
export class PhrasebookService {
    private readonly logger = new Logger(PhrasebookService.name);

    constructor(private readonly prisma: PrismaService) {
        // Seed default categories on startup
        this.seedDefaultCategories();
    }

    /**
     * Seed the 5 default B2 categories if they don't exist yet.
     */
    async seedDefaultCategories() {
        for (const cat of DEFAULT_B2_CATEGORIES) {
            await this.prisma.category.upsert({
                where: { name: cat.name },
                update: {},
                create: {
                    name: cat.name,
                    slug: cat.slug,
                },
            });
        }
        this.logger.log('Default B2 categories seeded successfully.');
    }

    /**
     * Get the current phrase count for a user.
     */
    async getUserPhraseCount(userId: string): Promise<number> {
        return this.prisma.phrase.count({ where: { userId } });
    }

    /**
     * Save a new phrase. Enforces the 100-item limit.
     */
    async savePhrase(userId: string, data: {
        german: string;
        context?: string;
        conversationId?: string;
        category?: string;
    }) {
        this.logger.log(`Saving phrase for user ${userId}: ${data.german}`);

        // Enforce limit
        const currentCount = await this.getUserPhraseCount(userId);
        if (currentCount >= MAX_PHRASES) {
            throw new BadRequestException(
                `Du hast das Maximum von ${MAX_PHRASES} Redemitteln erreicht. Bitte lösche einige, bevor du neue hinzufügst.`
            );
        }

        const categoryName = data.category || 'Alltag';

        // Upsert Category
        await this.prisma.category.upsert({
            where: { name: categoryName },
            update: { phraseCount: { increment: 1 } },
            create: {
                name: categoryName,
                phraseCount: 1, // Set to 1 on create
                slug: categoryName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            },
        });

        const phrase = await this.prisma.phrase.create({
            data: {
                userId,
                german: data.german,
                context: data.context,
                conversationId: data.conversationId,
                category: categoryName,
            },
        });

        return {
            ...phrase,
            currentCount: currentCount + 1,
            maxCount: MAX_PHRASES,
        };
    }

    /**
     * Get all phrases for a user, optionally filtered by category.
     */
    async getPhrases(userId: string, category?: string) {
        const where: any = { userId };
        if (category) {
            where.category = category;
        }
        const phrases = await this.prisma.phrase.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });

        const totalCount = await this.getUserPhraseCount(userId);

        return {
            phrases,
            totalCount,
            maxCount: MAX_PHRASES,
        };
    }

    /**
     * Get all categories with user-specific phrase counts.
     */
    async getCategories(userId: string) {
        // Get all categories
        const allCategories = await this.prisma.category.findMany({
            orderBy: { name: 'asc' },
        });

        // Get user-specific phrase counts
        const userCounts = await this.prisma.phrase.groupBy({
            by: ['category'],
            where: { userId },
            _count: {
                _all: true,
            },
        });

        const countMap = new Map(userCounts.map(c => [c.category, c._count._all]));

        return allCategories.map(cat => ({
            ...cat,
            phraseCount: countMap.get(cat.name) || 0, // Override with user count
        }));
    }

    /**
     * Delete a phrase by ID. Only the owner can delete.
     */
    async deletePhrase(userId: string, phraseId: string) {
        const phrase = await this.prisma.phrase.findUnique({
            where: { id: phraseId },
        });

        if (!phrase) {
            throw new NotFoundException('Redemittel nicht gefunden.');
        }

        if (phrase.userId !== userId) {
            throw new BadRequestException('Du kannst nur deine eigenen Redemittel löschen.');
        }

        // Decrement category count
        await this.prisma.category.updateMany({
            where: { name: phrase.category, phraseCount: { gt: 0 } },
            data: { phraseCount: { decrement: 1 } },
        });

        await this.prisma.phrase.delete({
            where: { id: phraseId },
        });

        this.logger.log(`Deleted phrase ${phraseId} for user ${userId}`);
        return { success: true };
    }

    /**
     * Update a phrase (move to different category and/or edit text/annotations).
     */
    async updatePhrase(userId: string, phraseId: string, data: {
        german?: string;
        context?: string;
        category?: string;
        notes?: string;
    }) {
        const phrase = await this.prisma.phrase.findUnique({
            where: { id: phraseId },
        });

        if (!phrase) {
            throw new NotFoundException('Redemittel nicht gefunden.');
        }

        if (phrase.userId !== userId) {
            throw new BadRequestException('Du kannst nur deine eigenen Redemittel bearbeiten.');
        }

        const oldCategory = phrase.category;
        const newCategory = data.category || oldCategory;

        // If category changed, update counts
        if (newCategory !== oldCategory) {
            // Decrement old category
            await this.prisma.category.updateMany({
                where: { name: oldCategory, phraseCount: { gt: 0 } },
                data: { phraseCount: { decrement: 1 } },
            });

            // Upsert & increment new category
            await this.prisma.category.upsert({
                where: { name: newCategory },
                update: { phraseCount: { increment: 1 } },
                create: {
                    name: newCategory,
                    slug: newCategory.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                },
            });
        }

        return this.prisma.phrase.update({
            where: { id: phraseId },
            data: {
                german: data.german ?? phrase.german,
                context: data.context !== undefined ? data.context : phrase.context,
                category: newCategory,
            },
        });
    }

    /**
     * Copy a phrase to another category.
     */
    async copyPhrase(userId: string, phraseId: string, targetCategory: string) {
        const phrase = await this.prisma.phrase.findUnique({
            where: { id: phraseId },
        });

        if (!phrase) {
            throw new NotFoundException('Redemittel nicht gefunden.');
        }

        if (phrase.userId !== userId) {
            throw new BadRequestException('Du kannst nur deine eigenen Redemittel kopieren.');
        }

        // Enforce limit
        const currentCount = await this.getUserPhraseCount(userId);
        if (currentCount >= MAX_PHRASES) {
            throw new BadRequestException(
                `Du hast das Maximum von ${MAX_PHRASES} Redemitteln erreicht. Bitte lösche einige, bevor du neue hinzufügst.`
            );
        }

        // Upsert target category
        await this.prisma.category.upsert({
            where: { name: targetCategory },
            update: { phraseCount: { increment: 1 } },
            create: {
                name: targetCategory,
                slug: targetCategory.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            },
        });

        return this.prisma.phrase.create({
            data: {
                userId,
                german: phrase.german,
                context: phrase.context,
                conversationId: phrase.conversationId,
                category: targetCategory,
            },
        });
    }
}