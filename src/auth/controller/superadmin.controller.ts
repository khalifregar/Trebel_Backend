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
  
  @Controller('auth/superadmin')
  export class SuperadminController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('register')
    register(@Body() body: { email: string; name: string; password: string }) {
      return this.authService.register({
        ...body,
        role: UserRole.SUPERADMIN,
      });
    }
  
    @Post('login')
    login(@Body() body: { email: string; password: string }) {
      return this.authService.loginWithRole(
        body.email,
        body.password,
        UserRole.SUPERADMIN,
      );
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('me')
    @Roles(UserRole.SUPERADMIN)
    getProfile(@Request() req) {
      return {
        super_id: req.user.userId,
        email: req.user.email,
        role: req.user.role,
      };
    }
  }
  