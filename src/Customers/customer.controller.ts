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
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CustomerDTO } from 'src/models/customer';
import {  CustomerDocument } from 'src/schemas/customer.schema';
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
  ): Promise<CustomerDTO> {
    return this.customerRepo.findOne(id);
  }

  @Post()
  @ApiBody({ description: 'body:json string' })
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  addCustomer(@Body() body: CustomerDocument): Promise<Object> {
    return this.customerRepo.create(body);
  }

  @ApiParam({ name: 'id' })
  @Put(':id')
  @UseFilters(ExceptionsLoggerFilter)
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'none')
  editCustomer(
    @Body() customer: CustomerDocument,
    @Param('id', ParseObjectIdPipe) id: string,
  ) {
    return this.customerRepo.update(id, customer);
  }

  @ApiParam({ name: 'id' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'none')
  deleteCustomer(@Param('id', ParseObjectIdPipe) id: string) {
    return this.customerRepo.delete(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'none')
  deleteCustomers(@Body() ids: any[]) {
    return this.customerRepo.deleteMany(ids);
  }
}
