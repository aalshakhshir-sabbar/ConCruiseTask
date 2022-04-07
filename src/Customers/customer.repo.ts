import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepo } from 'src/repositories/BaseRepo';
import { CustomerDocument } from 'src/schemas/customer.schema';

@Injectable()
export class CustomerRepo extends BaseRepo<CustomerDocument> {
  constructor(
    @InjectModel('Customer')
    private readonly customerModel: mongoose.Model<CustomerDocument>,
  ) {
    super(customerModel);
  }
}
