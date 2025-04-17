import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';

import { AuthService } from '../service/auth.service';
import { JwtStrategy } from '../jwt/jwt.strategy';

// ✅ Guards dan Decorator
import { RolesGuard } from '../../common/guards/roles.guard';

import { UserModule } from './user.module';
import { AdminModule } from './admin.module';
import { SuperadminModule } from './superadmin.module';

import { UserController } from '../controller/user.controller';
import { AdminAuthController } from '../controller/admin.controller';
import { SuperadminController } from '../controller/superadmin.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'JWT_SECRET_KEY',
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
    AdminModule,
    SuperadminModule,
  ],
  controllers: [
    UserController,
    AdminAuthController,
    SuperadminController,
  ],
  providers: [
    AuthService,
    JwtStrategy,

    // ✅ Tambahkan RolesGuard agar @Roles() bisa digunakan
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
