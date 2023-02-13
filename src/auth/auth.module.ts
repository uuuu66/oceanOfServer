import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAccessStrategy } from './jwt.access.strategy';
import { JwtRefreshStrategy } from './jwt.refresh.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwtAccessSecret'),
        signOptions: {},
      }),
    }),
  ],
  providers: [
    LocalStrategy,
    JwtAccessStrategy,
    AuthService,
    JwtRefreshStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
