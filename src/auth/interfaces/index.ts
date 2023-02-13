import { CookieOptions } from 'express';
import { User } from 'src/users/schemas/user.schema';

export interface TokenPayload {
  userId: number;
}
export interface SignInResponse {
  user: User;
  accessToken: string;
  accessOption: CookieOptions;
  refreshToken: string;
  refreshOption: CookieOptions;
}
export interface TokenResponse {
  token: string;
  cookieOption: CookieOptions;
}
