import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { response } from 'express';

import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';

import { LoginStategyPassportRequest } from './interfaces';
import JwtAuthenticationGuard from './jwtAuthenticaiton.guard';
import { LocalAuthenticationGuard } from './localAuthentication.guard';

@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() registrationData: CreateUserDto) {
    return this.authService.register(registrationData);
  }
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: LoginStategyPassportRequest, @Res() response) {
    const user = request.user;
    const cookie = this.authService.getJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: LoginStategyPassportRequest) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: LoginStategyPassportRequest, @Res() response) {
    response.set('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }
}
