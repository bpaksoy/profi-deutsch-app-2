import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(PrismaService.name);

    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL'),
                },
            },
        });
    }

    async onModuleInit() {
        await this.$connect();
        try {
            await this.$executeRawUnsafe(
                `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "theme" TEXT NOT NULL DEFAULT 'light'`
            );
            this.logger.log('Schema column check complete (theme column ensured)');
        } catch (e) {
            this.logger.warn('Column ensure warning:', e.message);
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}