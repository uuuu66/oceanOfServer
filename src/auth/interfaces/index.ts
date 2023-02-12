import { User } from 'src/users/schemas/user.schema';

export interface LoginStategyPassportRequest {
  user: User;
}
export interface TokenPayload {
  userId: number;
}
