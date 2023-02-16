import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import ErrorResponse from '../dtos.ts/error-response';

@Catch(HttpException)
export class HttpExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    console.log(exception, request.body);
    const statusCode = exception.getStatus();
    const message = JSON.parse(
      JSON.stringify(exception.getResponse()),
    )?.message;
    console.log(message);
    const error = new ErrorResponse({
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
      type: exception.message,
    });
    response.status(statusCode).json(error);
  }
}
