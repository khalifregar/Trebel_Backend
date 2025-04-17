// src/auth/module/admin.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from '../schemas/admin.schema';
import { AdminService } from '../service/admin.service';
import { AdminAuthController } from '../controller/admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { UserModule } from './user.module';

// src/auth/module/admin.module.ts
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    PassportModule,
    JwtModule.register({ secret: 'JWT_SECRET_KEY', signOptions: { expiresIn: '1d' } }),
    UserModule, // ⬅️ INI WAJIB!
  ],
  providers: [AdminService, JwtStrategy],
  exports: [AdminService],
})
export class AdminModule {}


