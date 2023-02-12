import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  public async register(registrationData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.usersService.createUser({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = undefined;

      return createdUser;
    } catch (error) {
      throw new HttpException(
        JSON.stringify(error),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  public async getAuthenticatedUser(
    phoneNumber: string,
    plainTextPassword: string,
  ) {
    try {
      const user = await this.usersService.readUserByPhoneNumber(phoneNumber);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        '잘못된 인증 정보입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        '잘못된 인증 정보입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  public getJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'jwtExpirationTime',
    )}`;
  }
  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
