import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
import { RolesGuard } from './roles.guard';

@Injectable()
export class GlobalAuthGuard implements CanActivate {
  constructor(
    private readonly jwtAuthGuard: JwtAuthGuard,
    private readonly rolesGuard: RolesGuard,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const path = request.route?.path;
    const method = request.method;

    // ✅ Allow route tanpa token: login & register
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

    if (isPublic) return true;

    const isJwtValid = await this.jwtAuthGuard.canActivate(context);
    if (!isJwtValid) return false;

    return this.rolesGuard.canActivate(context);
  }
}
