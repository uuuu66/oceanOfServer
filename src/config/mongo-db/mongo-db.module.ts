import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  // process.env.MONGO_URL 부분은 하드 코딩해도 괜찮다. "mongodb://localhost:27017"
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get('mongoURL'),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class MongoDbModule {}
