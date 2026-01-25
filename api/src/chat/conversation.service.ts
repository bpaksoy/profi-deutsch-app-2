import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConversationService {
    private readonly logger = new Logger(ConversationService.name);

    constructor(private readonly prisma: PrismaService) { }

    async createConversation(userId: string, topic: string = 'General') {
        // Ensure user exists (for development with 'user_default')
        await this.prisma.user.upsert({
            where: { id: userId },
            update: {},
            create: {
                id: userId,
                clerkId: userId, // Assuming unique constraint
                email: `${userId}@example.com`,
                name: 'Default User',
                level: 'B1'
            }
        });

        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        return this.prisma.conversation.create({
            data: {
                userId,
                sessionId,
                topic
            }
        });
    }

    async getConversations(userId: string) {
        return this.prisma.conversation.findMany({
            where: { userId },
            orderBy: { startedAt: 'desc' },
            include: {
                messages: {
                    take: 1,
                    orderBy: { timestamp: 'desc' }
                }
            }
        });
    }

    async getMessages(conversationId: string) {
        return this.prisma.message.findMany({
            where: { conversationId },
            orderBy: { timestamp: 'asc' }
        });
    }

    async addMessage(conversationId: string, role: 'user' | 'assistant', content: string) {
        return this.prisma.message.create({
            data: {
                conversationId,
                role,
                content
            }
        });
    }

    async getConversationById(id: string) {
        return this.prisma.conversation.findUnique({
            where: { id }
        });
    }
}
