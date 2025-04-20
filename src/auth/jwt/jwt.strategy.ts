import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'JWT_SECRET_KEY', // ⚠️ Pastikan ini sama dengan yang di .env atau config lo
    });
  }

  async validate(payload: any) {
    // ⬇️ Return payload langsung agar req.user.sub tersedia
    return payload;
  }
}
