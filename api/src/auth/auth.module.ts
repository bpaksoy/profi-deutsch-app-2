import { Module, Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClerkAuthGuard } from './clerk-auth.guard';
import { PrismaModule } from '../prisma/prisma.module';

@Global()
@Module({
    imports: [PrismaModule],
    providers: [AuthService, ClerkAuthGuard],
    exports: [AuthService, ClerkAuthGuard],
})
export class AuthModule { }
