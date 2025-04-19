import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../service/user.service';
import { AdminService } from './admin.service';
import { SuperadminService } from './superadmin.service';
import { UserRole } from '../../common/enums/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly adminService: AdminService,
    private readonly superadminService: SuperadminService,
  ) {}

  async register(data: {
    email: string;
    name: string;
    password: string;
    role: UserRole;
  }) {
    const { email, name, password, role } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    let newAccount;
    if (role === UserRole.USER) {
      const existing = await this.userService.findByEmail(email);
      if (existing) throw new BadRequestException('Email sudah digunakan');
      newAccount = await this.userService.create({
        email,
        name,
        password: hashedPassword,
        role,
      });
    } else if (role === UserRole.ADMIN) {
      const existing = await this.adminService.findByEmail(email);
      if (existing) throw new BadRequestException('Email sudah digunakan');
      newAccount = await this.adminService.create({
        email,
        name,
        password: hashedPassword,
        role,
      });
    } else if (role === UserRole.SUPERADMIN) {
      const existing = await this.superadminService.findByEmail(email);
      if (existing) throw new BadRequestException('Email sudah digunakan');
      newAccount = await this.superadminService.create({
        email,
        name,
        password: hashedPassword,
        role,
      });
    } else {
      throw new BadRequestException('Role tidak valid');
    }

    return this.generateToken(newAccount, role);
  }

  async loginWithRole(
    email: string,
    password: string,
    role: UserRole,
    actor = 'unknown',
  ) {
    let account;

    if (role === UserRole.USER) {
      account = await this.userService.findByEmail(email);
    } else if (role === UserRole.ADMIN) {
      account = await this.adminService.findByEmail(email);
    } else if (role === UserRole.SUPERADMIN) {
      account = await this.superadminService.findByEmail(email);
    } else {
      throw new UnauthorizedException('Role tidak valid');
    }

    if (!account || !(await bcrypt.compare(password, account.password))) {
      throw new UnauthorizedException('Email atau password salah');
    }

    return this.generateToken(account, role, actor);
  }

  private generateToken(account: any, role: UserRole, actor?: string) {
    const basePayload = {
      sub: account._id,
      email: account.email,
      role,
      actor: actor ?? role,
    };

    if (role === UserRole.USER) basePayload['user_id'] = account._id;
    if (role === UserRole.ADMIN) basePayload['admin_id'] = account._id;
    if (role === UserRole.SUPERADMIN) basePayload['super_id'] = account._id;

    return {
      status: 'success',
      message: 'OK',
      data: {
        access_token: this.jwtService.sign(basePayload),
        email: account.email,
        role,
        [`${role.toLowerCase()}_id`]: account._id,
      },
    };
  }

  async logout(user: any) {
    if (user.role !== UserRole.USER) {
      throw new UnauthorizedException('Role tidak diizinkan untuk logout');
    }

    await this.userService.updateLastLogout(user.userId);

    return { message: 'Logout berhasil' };
  }
}
