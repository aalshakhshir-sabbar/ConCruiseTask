import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs'

import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CustomerDTO } from 'src/models/customer';
import { CustomerDocument } from 'src/schemas/customer.schema';
import { PaginationDTO } from 'src/types/paginationdto';
import { ExceptionsLoggerFilter } from 'src/utils/exceptionLogger.filter';
import { ParseObjectIdPipe } from 'src/utils/id.pipe';
import { CreateCustomerCommand } from './commands/create-customer.command';
import { DeleteCustomerCommand } from './commands/delete-customer.command';
import { CustomerService } from './customer.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService, private readonly commandBus: CommandBus) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async getCustomers(
    @Query() paginationQuery: PaginationDTO,
  ): Promise<CustomerDocument[]> {
    return await this.customerService.find(paginationQuery);
  }

  @ApiParam({ name: 'id' })
  @Get(':id')
  getCustomerById(@Param('id', ParseObjectIdPipe) id: string): Promise<Object> {
    return this.customerService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  addCustomer(@Body() body: CustomerDTO) {
    this.commandBus.execute(new CreateCustomerCommand(body.name));
    return this.customerService.create(body);
  }

  @ApiParam({ name: 'id' })
  @Put(':id')
  @UseFilters(ExceptionsLoggerFilter)
  @HttpCode(HttpStatus.OK)
  editCustomer(
    @Body() customer: CustomerDTO,
    @Param('id', ParseObjectIdPipe) id: string,
  ) {
    return this.customerService.update(customer, id);
  }

  @ApiParam({ name: 'id' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteCustomer(@Param('id', ParseObjectIdPipe) id: string) {
    this.commandBus.execute(new DeleteCustomerCommand(id));
    return this.customerService.deleteOne(id);
  }

  @Patch('/delete')
  @HttpCode(HttpStatus.OK)
  deleteCustomers(@Body() ids: any[]) {
    return this.customerService.deleteMany(ids);
  }
}
