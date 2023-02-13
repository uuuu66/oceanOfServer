import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { keys } from 'src/common/constants';

@Injectable()
export default class JwtRefreshGuard extends AuthGuard(
  keys.REFRESH_TOKEN_GUARD_TYPE,
) {}
