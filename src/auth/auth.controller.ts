import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ObjectResponse } from 'src/common/dtos.ts/object-response';
import { ApiDoc } from 'src/common/decorators/api-docs';
import { User } from 'src/users/schemas/user.schema';

import { AuthService } from './auth.service';
import SignInDto from './dtos/sign-in-dto';
import { SignUpDto } from './dtos/sign-up-dto';

import { LocalAuthenticationGuard } from './strategies/localAuthentication.guard';
import { keys } from 'src/common/constants';
import SignInResponseDto from './dtos/auth-response-dto';
import AuthResponseDto from './dtos/auth-response-dto';

@Controller('authentication')
@ApiTags('인증/권한')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiDoc({
    summary: '회원가입',
    description: '회원가입입니다.',
    responseModel: User,
  })
  @HttpCode(201)
  @Post('sign-up')
  async register(@Body() registrationData: SignUpDto, @Res() response) {
    return response.send(
      new ObjectResponse(this.authService.register(registrationData)),
    );
  }

  @ApiDoc({
    summary: '로그인',
    description: '로그인입니다.',
    responseModel: User,
  })
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('sign-in')
  async logIn(
    @Body() request: SignInDto,
    @Res() response,
  ): Promise<ObjectResponse<SignInResponseDto>> {
    const { user, accessToken, refreshToken, refreshOption } =
      await this.authService.signIn(request);
    response.cookie(keys.REFRESH_TOKEN_COOKIE, refreshToken, refreshOption);
    const newResDto = new AuthResponseDto(user, accessToken);
    return response.send(new ObjectResponse(newResDto));
  }
  @ApiDoc({
    summary: '로그아웃',
    description: '로그아웃입니다.',
  })
  @ApiBearerAuth()
  @Post('sign-out')
  async logOut(@Req() req, @Res() response) {
    response.set('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(204);
  }
}
