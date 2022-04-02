import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Pointed } from './models/ride';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getBestRides() {
    return this.appService.getBestRides();
  }
}
