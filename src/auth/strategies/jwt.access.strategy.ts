import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UsersService } from '../../users/users.service';
import { TokenPayload } from '../interfaces';
import { CustomRequest } from 'src/common/interfaces';
import { keys } from 'src/common/constants';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: CustomRequest) => {
          return request?.cookies[keys.ACCESS_TOKEN_COOKIE];
        },
      ]),
      secretOrKey: configService.get('jwtAccessSecret'),
    });
  }
  async validate(payload: TokenPayload) {
    return await this.userService.readUserById(payload.userId);
  }
}
