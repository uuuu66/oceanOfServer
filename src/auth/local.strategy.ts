import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { AuthService } from './auth.service';
import { IUser } from 'src/common/interfaces/IUsers';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'phoneNumber',
    });
  }
  async validate(phoneNumber: string, password: string): Promise<IUser> {
    return this.authService.getAuthenticatedUser(phoneNumber, password);
  }
}
