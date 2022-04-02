import { Controller, Delete, Get, Head, Header, HttpCode, Param, Post, Put, Req, Request } from '@nestjs/common';
import { IRide } from 'src/models/ride';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getCustomers() {
    return this.customerService.getCustomers();
  }

  @Post()
  @HttpCode(201)
  @Header('Cache-Control', 'none')
  addCustomer(@Req() req: Request): void {
    this.customerService.addCustomer(req);
  }

  @Put()
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  editCustomer(@Req() req: Request): void {
    return this.customerService.editCustomer(req);
  }

  @Delete(':id')
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  deleteCustomer(@Param() params): void {
    this.customerService.deleteCustomer(params.id);
  }

  @Post()
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  deleteCustomers(@Req() req: Request): void {
    this.customerService.deleteCustomers(req);
  }

}
