import { CookieOptions } from 'express';
import { Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export interface TokenPayload {
  userId: Types.ObjectId;
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
