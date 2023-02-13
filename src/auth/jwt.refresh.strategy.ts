import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UsersService } from '../users/users.service';
import { TokenPayload } from './interfaces';
import { CustomRequest } from 'src/common/interfaces';
import { keys } from 'src/common/constants';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  keys.REFRESH_TOKEN_GUARD_TYPE,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: CustomRequest) => {
          return request?.cookies[keys.REFRESH_TOKEN_COOKIE];
        },
      ]),
      secretOrKey: configService.get('jwtRefreshSecret'),
    });
  }
  async validate(payload: TokenPayload) {
    return await this.userService.readUserById(payload.userId);
  }
}
