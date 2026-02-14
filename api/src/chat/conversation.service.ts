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
}
