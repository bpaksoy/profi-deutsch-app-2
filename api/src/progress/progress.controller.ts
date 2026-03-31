import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller('progress')
@UseGuards(FirebaseAuthGuard)
export class ProgressController {
    constructor(private readonly progressService: ProgressService) { }

    @Get('stats')
    async getStats(@GetUser() user: any) {
        return this.progressService.getUserProgress(user.clerkId);
    }

    @Get('theme')
    async getTheme(@GetUser() user: any) {
        return this.progressService.getUserTheme(user.clerkId);
    }

    @Put('theme')
    async setTheme(@GetUser() user: any, @Body() body: { theme: string }) {
        const allowed = ['light', 'dark', 'system'];
        const theme = allowed.includes(body.theme) ? body.theme : 'light';
        return this.progressService.setUserTheme(user.clerkId, theme);
    }
}
