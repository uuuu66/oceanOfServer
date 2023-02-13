import { INestApplication } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { SwaggerUiOptions } from '@nestjs/swagger/dist/interfaces/swagger-ui-options.interface';
import * as expressBasicAuth from 'express-basic-auth';
import { AppModule } from 'src/app.module';

/**
 * Swagger 세팅
 *
 * @param {INestApplication} app
 */
export function setupSwagger(app: INestApplication): void {
  console.log(AppModule.swaggerId, AppModule.password);
  app.use(
    '/api-docs',
    expressBasicAuth({
      challenge: true,
      users: { [AppModule.swaggerId]: AppModule.password },
    }),
  );
  const options = new DocumentBuilder()
    .setTitle('oceanOf Swagger API Docs')
    .setDescription('oceanOf Swagger API Docs')
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'access_token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  const swaggerOptions: SwaggerUiOptions = {
    persistAuthorization: true,
  };
  const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions,
  };
  SwaggerModule.setup('api-docs', app, document, swaggerCustomOptions);
}
