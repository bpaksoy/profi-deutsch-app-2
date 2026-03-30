import { Module, Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { PrismaModule } from '../prisma/prisma.module';

@Global()
@Module({
    imports: [PrismaModule],
    providers: [AuthService, FirebaseAuthGuard],
    exports: [AuthService, FirebaseAuthGuard],
})
export class AuthModule { }
