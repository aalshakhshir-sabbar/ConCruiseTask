import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiPropertyOptional,
  ApiQuery,
} from '@nestjs/swagger';
import { IsEmpty } from 'class-validator';
import { CustomerDTO } from 'src/models/customer';
import { Customer } from 'src/schemas/customer.schema';
import { PaginationDTO } from 'src/types/paginationdto';
import { ExceptionsLoggerFilter } from 'src/utils/exceptionLogger.filter';
import { ParseObjectIdPipe } from 'src/utils/id.pipe';
import { CustomerService } from './customer.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async getCustomers(
    @Query() paginationQuery: PaginationDTO,
  ): Promise<Customer[]> {
    return await this.customerService.getCustomers(paginationQuery);
  }

  @ApiParam({ name: 'id' })
  @Get(':id')
  getCustomerById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<Customer[]> {
    return this.customerService.getCustomer(id);
  }

  @Post()
  @ApiBody({ description: 'body:json string' })
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  addCustomer(@Body() body: CustomerDTO): Promise<Customer> {
    return this.customerService.addCustomer(body);
  }

  @ApiParam({ name: 'id' })
  @Put(':id')
  @UseFilters(ExceptionsLoggerFilter)
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'none')
  editCustomer(
    @Body() customer: CustomerDTO,
    @Param('id', ParseObjectIdPipe) id: string,
  ) {
    return this.customerService.editCustomer(customer, id);
  }

  @ApiParam({ name: 'id' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'none')
  deleteCustomer(@Param('id', ParseObjectIdPipe) id: string) {
    return this.customerService.deleteCustomer(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'none')
  deleteCustomers(@Body() customer: CustomerDTO) {
    return this.customerService.deleteCustomers(customer);
  }
}
