import {
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class OptionalFirebaseAuthGuard implements CanActivate {
    constructor(private authService: AuthService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            // Allow unauthenticated access — controller handles guest logic
            request['user'] = null;
            return true;
        }

        try {
            const payload = await this.authService.validateToken(token);
            request['user'] = { clerkId: payload.uid || payload.sub };
        } catch {
            request['user'] = null;
        }

        return true;
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
