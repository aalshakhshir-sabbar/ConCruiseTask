import { Controller, Delete, Get, Head, Header, HttpCode, Param, Post, Put, Req, Request } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getCustomers() {
    return this.customerService.getCustomers();
  }

  @Get(':id')
  getCustomerById() {
    return this.customerService.getCustomers();
  }


  @Post()
  @HttpCode(201)
  @Header('Cache-Control', 'none')
  addCustomer(@Req() req: Request) {
    return this.customerService.addCustomer(req);
  }

  @Put(':id')
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  editCustomer(@Req() req: Request, @Param() params) {
    const id = params.id
    return this.customerService.editCustomer(req, id);
  }

  @Delete(':id')
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  deleteCustomer(@Param() params) {
    return this.customerService.deleteCustomer(params.id);
  }

  @Post()
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  deleteCustomers(@Req() req: Request) {
    return this.customerService.deleteCustomers(req);
  }

}
