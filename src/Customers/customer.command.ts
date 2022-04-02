import { Command, Positional, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Injectable()
export class CustomerCommand {
  constructor(private readonly customerSerivce: CustomerService) {}

  @Command({
    command: 'customers',
    describe: 'get all customers',
  })
  async customers(
  ) {
      console.log("HI")
      return this.customerSerivce.getCustomers();
  }
}