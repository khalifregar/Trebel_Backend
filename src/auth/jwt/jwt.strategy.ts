import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'JWT_SECRET_KEY', // ganti ke env nanti
    });
  }

  async validate(payload: any) {
    // 👇 pastikan payload lengkap
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
