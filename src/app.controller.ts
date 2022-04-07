import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/match')
  getBestRides() {
    return this.appService.getBestRides();
  }
  @Get('/failed')
  getFailedRides() {
    return this.appService.getFailedRides();
  }
}
