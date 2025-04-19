import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { UserRole } from '../schemas/user.schema';

@Controller('auth/user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() body: { email: string; name: string; password: string }) {
    return this.authService.register({
      ...body,
      role: UserRole.USER,
    });
  }

  @Public()
  @Post('login')
  login(
    @Body() body: { email: string; password: string; actor?: string },
  ) {
    return this.authService.loginWithRole(
      body.email,
      body.password,
      UserRole.USER,
      body.actor || 'user',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @Roles(UserRole.USER)
  getProfile(@Request() req) {
    return {
      user_id: req.user.userId,
      email: req.user.email,
      role: req.user.role,
    };
  }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    @Roles(UserRole.USER)
    logout(@Request() req) {
    return this.authService.logout(req.user);
  }

}
