import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Injectable()
export class CustomerCommand {
  constructor(private readonly customerSerivce: CustomerService) {}

  @Command({
    command: 'customers',
    describe: 'get all customers',
  })
  async customers() {
    return this.customerSerivce.getCustomers();
  }
}
