import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ClerkAuthGuard } from '../auth/clerk-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller('progress')
@UseGuards(ClerkAuthGuard)
export class ProgressController {
    constructor(private readonly progressService: ProgressService) { }

    @Get('stats')
    async getStats(@GetUser() user: any) {
        return this.progressService.getUserProgress(user.clerkId);
    }
}
