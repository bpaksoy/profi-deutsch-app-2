import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConversationService {
    private readonly logger = new Logger(ConversationService.name);

    constructor(private readonly prisma: PrismaService) { }

    async createConversation(clerkId: string, topic: string = 'Neues Gespräch') {
        return this.prisma.conversation.create({
            data: {
                userId: clerkId,
                topic
            }
        });
    }

    async getConversations(clerkId: string) {
        return this.prisma.conversation.findMany({
            where: { userId: clerkId },
            orderBy: { createdAt: 'desc' },
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

    async updateConversation(id: string, userId: string, topic: string) {
        const conv = await this.prisma.conversation.findFirst({
            where: { id, userId }
        });
        if (!conv) throw new Error('Conversation not found or access denied');
        
        return this.prisma.conversation.update({
            where: { id },
            data: { topic }
        });
    }

    async deleteConversation(id: string, userId: string) {
        const conv = await this.prisma.conversation.findFirst({
            where: { id, userId }
        });
        if (!conv) throw new Error('Conversation not found or access denied');

        // First delete all messages
        await this.prisma.message.deleteMany({
            where: { conversationId: id }
        });
        return this.prisma.conversation.delete({
            where: { id }
        });
    }
}
