import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core/constants';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/module/auth.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './auth/module/admin.module';
import { SuperadminModule } from './auth/module/superadmin.module';

import { AdminAuthController } from './auth/controller/admin.controller';
import { SuperadminController } from './auth/controller/superadmin.controller';

import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { GlobalAuthGuard } from './common/guards/global-auth.guard';

import { PlaylistModule } from './playlist/playlist.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin1123@cluster0.bahrlcm.mongodb.net/authApp',
    ),
    AuthModule,
    UserModule,
    AdminModule,
    SuperadminModule,
    PlaylistModule, // ✅ sudah include semua (playlist, soundtrack, dll)
  ],
  controllers: [
    AppController,
    AdminAuthController,
    SuperadminController,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
