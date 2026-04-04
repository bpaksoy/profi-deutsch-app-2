import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

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
        try {
            execSync('npx prisma migrate deploy', { stdio: 'pipe' });
            this.logger.log('DB migrations applied successfully');
        } catch (e) {
            this.logger.warn('Migration warning (may already be up to date):', e.message);
        }
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}