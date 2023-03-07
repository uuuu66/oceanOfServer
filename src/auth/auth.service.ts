import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignInResponse, TokenPayload, TokenResponse } from './interfaces';
import { SignUpDto } from './dtos/sign-up-dto';
import SignInDto from './dtos/sign-in-dto';
import { accessMaxAge, refreshMaxAge } from 'src/common/constants';
import { CookieOptions } from 'express';
import ErrorResponse from 'src/common/dtos.ts/error-response';
import { Types } from 'mongoose';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  public async register(registrationData: SignUpDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const dto: CreateUserDto = {
        ...registrationData,
        password: hashedPassword,
        feeling: '모르겠음',
        role: 1,
      };
      const createdUser = await this.usersService.createUser(dto);
      createdUser.password = undefined;

      return createdUser;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  public async signIn(signInData: SignInDto): Promise<SignInResponse> {
    try {
      const userId = signInData.phoneNumber;
      const user = await this.usersService.readUserByPhoneNumber(userId);
      user.password = undefined;
      const accessToken = this.getJwtAccessToken(user.id);
      const refreshToken = this.getJwtRefreshToken(user.id);
      return {
        user,
        accessToken: accessToken.token,
        accessOption: accessToken.cookieOption,
        refreshToken: refreshToken.token,
        refreshOption: refreshToken.cookieOption,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.FORBIDDEN);
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
      console.log(error);
      throw new HttpException(error.response, 403);
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
      const error = new Error('비밀번호가 일치하지 않습니다.');
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }
  public getCookieForLogOut(): TokenResponse {
    const cookieOption: CookieOptions = {
      httpOnly: true,
      maxAge: 0,
    };
    return { token: '', cookieOption };
  }

  public getJwtAccessToken(userId: Types.ObjectId): TokenResponse {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('jwtAccessSecret'),
    });

    const cookieOption: CookieOptions = {
      httpOnly: true,
      maxAge: accessMaxAge,
    };
    return { token, cookieOption };
  }

  public getJwtRefreshToken(userId: Types.ObjectId): TokenResponse {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('jwtRefreshSecret'),
    });
    const cookieOption: CookieOptions = {
      httpOnly: true,
      maxAge: refreshMaxAge,
    };

    return { token, cookieOption };
  }
}
