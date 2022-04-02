import { Body, Controller, Delete, Get, Head, Header, HttpCode, Param, Post, Put, Req, Request } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CustomerDTO } from 'src/models/customer';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Get()
  getCustomers() {
    return this.customerService.getCustomers();
  }
  @ApiParam({name: 'id'})
  @Get(':id')
  getCustomerById() {
    return this.customerService.getCustomers();
  }

  @Post()
  @ApiBody({description: "body:json string"})
  @HttpCode(201)
  @Header('Cache-Control', 'none')
  addCustomer(@Body() body: CustomerDTO) {
    return this.customerService.addCustomer(body);
  }

  @ApiParam({name: 'id'})
  @Put(':id')
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  editCustomer(@Body() customer: CustomerDTO, @Param() params) {
    const id = params.id
    return this.customerService.editCustomer(customer, id);
  }

  @ApiParam({name: 'id'})
  @Delete(':id')
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  deleteCustomer(@Param() params) {
    return this.customerService.deleteCustomer(params.id);
  }

  @Post()
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  deleteCustomers(@Body() customer: CustomerDTO) {
    return this.customerService.deleteCustomers(customer);
  }

}
