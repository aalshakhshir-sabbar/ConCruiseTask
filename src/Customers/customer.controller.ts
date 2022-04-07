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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CustomerDTO } from 'src/models/customer';
import { CustomerDocument } from 'src/schemas/customer.schema';
import { PaginationDTO } from 'src/types/paginationdto';
import { ExceptionsLoggerFilter } from 'src/utils/exceptionLogger.filter';
import { ParseObjectIdPipe } from 'src/utils/id.pipe';
import { CustomerRepo } from './customer.repo';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerRepo: CustomerRepo) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async getCustomers(
    @Query() paginationQuery: PaginationDTO,
  ): Promise<CustomerDocument[]> {
    return await this.customerRepo.find(paginationQuery);
  }

  @ApiParam({ name: 'id' })
  @Get(':id')
  getCustomerById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<CustomerDocument> {
    return this.customerRepo.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  addCustomer(@Body() body: CustomerDTO): Promise<Object> {
    return this.customerRepo.create(body);
  }

  @ApiParam({ name: 'id' })
  @Put(':id')
  @UseFilters(ExceptionsLoggerFilter)
  @HttpCode(HttpStatus.OK)
  editCustomer(
    @Body() customer: CustomerDTO,
    @Param('id', ParseObjectIdPipe) id: string,
  ) {
    return this.customerRepo.update(id, customer);
  }

  @ApiParam({ name: 'id' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteCustomer(@Param('id', ParseObjectIdPipe) id: string) {
    return this.customerRepo.delete(id);
  }

  @Post('/delete')
  @HttpCode(HttpStatus.OK)
  deleteCustomers(@Body() ids: any[]) {
    return this.customerRepo.deleteMany(ids);
  }
}
