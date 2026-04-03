import { Module, Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { OptionalFirebaseAuthGuard } from './optional-auth.guard';
import { PrismaModule } from '../prisma/prisma.module';

@Global()
@Module({
    imports: [PrismaModule],
    providers: [AuthService, FirebaseAuthGuard, OptionalFirebaseAuthGuard],
    exports: [AuthService, FirebaseAuthGuard, OptionalFirebaseAuthGuard],
})
export class AuthModule { }
