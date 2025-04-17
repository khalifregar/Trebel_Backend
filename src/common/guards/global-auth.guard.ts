import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
import { RolesGuard } from './roles.guard';

@Injectable()
export class GlobalAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtAuthGuard: JwtAuthGuard,
    private readonly rolesGuard: RolesGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const path = request.baseUrl + request.route?.path;

    const publicRoutes = [
      { path: '/auth/superadmin/login', method: 'POST' },
      { path: '/auth/superadmin/register', method: 'POST' },
      { path: '/auth/admin/login', method: 'POST' },
      { path: '/auth/admin/register', method: 'POST' },
      { path: '/auth/user/login', method: 'POST' },
      { path: '/auth/user/register', method: 'POST' },
    ];

    const isPublic = publicRoutes.some(
      (r) => r.path === path && r.method === method.toUpperCase(),
    );

    if (isPublic) {
      return true;
    }

    // ✅ Jalankan AuthGuard & biarkan NestJS handle user injection ke req.user
    const jwtGuard = new (JwtAuthGuard as any)();
    const isJwtValid = await jwtGuard.canActivate(context);
    if (!isJwtValid) return false;

    // ✅ Jalankan roles guard
    return this.rolesGuard.canActivate(context);
  }
}
