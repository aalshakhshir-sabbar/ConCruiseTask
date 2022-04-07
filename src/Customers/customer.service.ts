import { Body, Injectable } from '@nestjs/common';
import { CustomerDTO } from 'src/models/customer';
import { Customer, CustomerDocument } from 'src/schemas/customer.schema';
import { PaginationDTO } from 'src/types/paginationdto';
import { CustomerRepo } from './customer.repo';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepo: CustomerRepo) {}
  async find(
    paginationQuery: PaginationDTO = { limit: 10, page: 0 },
  ): Promise<CustomerDocument[]> {
    return this.customerRepo.find(paginationQuery);
  }

  async findOne(id: string): Promise<Object> {
    return this.customerRepo.findOne(id);
  }

  async create(customer: CustomerDTO): Promise<Object> {
    return this.customerRepo.create(customer);
  }

  async update(@Body() customer: CustomerDTO, id: string) {
    return this.customerRepo.update(id, customer);
  }
  async deleteOne(id: string) {
    return this.customerRepo.delete(id);
  }
  async deleteMany(ids: string[]) {
    this.customerRepo.deleteMany(ids);
    return { success: true };
  }
}
