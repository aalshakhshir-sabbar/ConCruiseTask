import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Pointed } from './models/ride';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/match')
  getBestRides() {
    console.log("HI")
    return this.appService.getBestRides();
  }
  @Get('/failed')
  getFailedRides() {
    return this.appService.getFailedRides();
  }
}
