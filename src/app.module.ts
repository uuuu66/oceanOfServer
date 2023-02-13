import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { MongoDbModule } from './config/mongo-db/mongo-db.module';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'local'
          ? '.local.env'
          : process.env.NODE_ENV === 'dev'
          ? '.dev.env'
          : '.prod.env',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      load: [configuration],
    }),
    MongoDbModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {
  static port: string;
  static swaggerId: string;
  static password: string;
  constructor(configService: ConfigService) {
    AppModule.port = configService.get('port');
    AppModule.password = configService.get('swaggerPwd');
    AppModule.swaggerId = configService.get('swaggerId');
  }
}
