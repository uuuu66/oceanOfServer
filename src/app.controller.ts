import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { UseRefreshGuard } from './common/decorators/refresh-guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseRefreshGuard()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
