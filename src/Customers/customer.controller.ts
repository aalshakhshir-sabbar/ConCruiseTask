import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { CustomerDTO } from 'src/models/customer';
import { Customer } from 'src/schemas/customer.schema';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Get()
  async getCustomers(): Promise<Customer[]> {
    return await this.customerService.getCustomers();
  }
  @ApiParam({ name: 'id' })
  @Get(':id')
  getCustomerById(@Param() params) : Promise<Customer[]>{
    return this.customerService.getCustomer(params.id);
  }

  @Post()
  @ApiBody({ description: 'body:json string' })
  @HttpCode(201)
  @Header('Cache-Control', 'none')
  addCustomer(@Body() body: CustomerDTO): Promise<Customer> {
    return this.customerService.addCustomer(body);
  }

  @ApiParam({ name: 'id' })
  @Put(':id')
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  editCustomer(@Body() customer: CustomerDTO, @Param() params) {
    const id = params.id;
    return this.customerService.editCustomer(customer, id);
  }

  @ApiParam({ name: 'id' })
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
