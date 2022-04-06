import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { AppService } from './app.service';

@Injectable()
export class AppCommand {
  constructor(private readonly appService: AppService) {}

  @Command({
    command: 'drivers',
    describe: 'get all drivers',
  })
  async drivers() {
    console.log('drivers', await this.appService.getDrivers());
  }

  @Command({
    command: 'customers',
    describe: 'get all customers',
  })
  async customers() {
    console.log('drivers', await this.appService.getCustomers());
  }

  @Command({
    command: 'match',
    describe: 'get assigned customers to drivers',
  })
  async match() {
    console.log('matches', await this.appService.getBestRides());
  }

  @Command({
    command: 'exit',
    describe: 'get assigned customers to drivers',
  })
  async exit() {
    console.log('exit app');
  }
}
