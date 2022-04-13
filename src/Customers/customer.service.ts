import { Body, Injectable } from '@nestjs/common';
import { CustomerDTO } from 'src/models/customer';
import { EventBus } from '@nestjs/cqrs';

import { CustomerDocument } from 'src/schemas/customer.schema';
import { PaginationDTO } from 'src/types/paginationdto';
import { CustomerRepo } from './customer.repo';
import { DeletedCustomerEvent } from './events/delete-customer.event';
import { SnsService } from 'src/aws/sns.service';
import { CreateCustomerEvent } from './events/create-customer.event';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepo: CustomerRepo,
    private snsSerivce: SnsService,
  ) {}
  async find(
    paginationQuery: PaginationDTO = { limit: 10, page: 0 },
  ): Promise<CustomerDocument[]> {
    return this.customerRepo.find(paginationQuery);
  }

  async findOne(id: string): Promise<Object> {
    return this.customerRepo.findOne(id);
  }

  async create(customer: CustomerDTO) {
    this.snsSerivce.publish('create_customer', new CreateCustomerEvent('test'))
    return this.customerRepo.create(customer);
  }

  async update(@Body() customer: CustomerDTO, id: string) {
    return this.customerRepo.update(id, customer);
  }
  async deleteOne(id: string) {
    this.snsSerivce.publish('customer', new DeletedCustomerEvent(id));
    return this.customerRepo.delete(id);
  }
  async deleteMany(ids: string[]) {
    this.customerRepo.deleteMany(ids);
    return { success: true };
  }
}
