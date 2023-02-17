import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalAuthenticationGuard
  extends AuthGuard('local')
  implements CanActivate
{
  constructor(private authService: AuthService) {
    super({});
  }
  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const { body } = request;
    if (!body.phoneNumber || !body.password)
      throw new UnauthorizedException('핸드폰 번호와 비밀번호를 입력해주세요', {
        cause: new Error('핸드폰 번호와 비밀번호를 입력해주세요'),
      });
    return true;
    //true 나오면  통과 false 나오면 거부
  }
}
