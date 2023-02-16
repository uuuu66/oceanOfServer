import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AuthService } from '.././auth.service';

import { User } from 'src/users/schemas/user.schema';
import { keys } from 'src/common/constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'phoneNumber',
      passwordField: 'password',
    });
  }
  async validate(phoneNumber: string, password: string): Promise<User> {
    const user = this.authService.getAuthenticatedUser(phoneNumber, password);
    if (!user)
      throw new HttpException(
        new Error(`유저가 존재하지 않습니다`),
        HttpStatus.UNAUTHORIZED,
      );
    return user;
  }
}
