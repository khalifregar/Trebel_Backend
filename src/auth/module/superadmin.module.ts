import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperAdmin, SuperAdminSchema } from '../schemas/superadmin.schema';
import { SuperadminService } from '../service/superadmin.service';
import { SuperadminController } from '../controller/superadmin.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { UserModule } from './user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SuperAdmin.name, schema: SuperAdminSchema }]),
    PassportModule,
    JwtModule.register({ secret: 'JWT_SECRET_KEY', signOptions: { expiresIn: '1d' } }),
    UserModule, // ⬅️ INI WAJIB JUGA!
  ],
  providers: [SuperadminService, JwtStrategy],
  exports: [SuperadminService],
})
export class SuperadminModule {}


