import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { MongoDbModule } from './config/mongo-db/mongo-db.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
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
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, AuthService],
})
export class AppModule {}
