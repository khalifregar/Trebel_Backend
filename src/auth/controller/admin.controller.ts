import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../schemas/user.schema';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth/admin')
export class AdminAuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.loginWithRole(
      body.email,
      body.password,
      UserRole.ADMIN,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.SUPERADMIN)
  @Post('register')
  register(@Body() body, @Request() req) {
    return this.authService.register({ ...body, role: UserRole.ADMIN });
  }
  

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @Roles(UserRole.ADMIN)
  getProfile(@Request() req) {
    return {
      admin_id: req.user.userId,
      email: req.user.email,
      role: req.user.role,
    };
  }
}
