import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { keys } from '../constants';

export const UseRefreshGuard = () => {
  return applyDecorators(UseGuards(AuthGuard(keys.REFRESH_TOKEN_GUARD_TYPE)));
};
