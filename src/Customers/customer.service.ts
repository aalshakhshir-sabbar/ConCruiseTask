import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AppService } from 'src/app.service';
import { CustomerDTO } from 'src/models/customer';
import { Customer, CustomerDocument } from 'src/schemas/customer.schema';
import { Model } from 'mongoose';
import { PaginationDTO } from 'src/types/paginationdto';

@Injectable()
export class CustomerService {
  customers: any = this.appService.getCustomers();
  constructor(
    private readonly appService: AppService,
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {
    this.customers = this.appService.getCustomers();
  }
  async getCustomers(
    paginationQuery: PaginationDTO = { limit: 10, page: 0 },
  ): Promise<Customer[]> {
    return this.customerModel
      .find()
      .skip(paginationQuery.page * paginationQuery.limit)
      .limit(paginationQuery.limit);
  }

  async getCustomer(id: string): Promise<Customer[]> {
    return this.customerModel.findById(id);
  }

  async addCustomer(customer: CustomerDTO): Promise<Customer> {
    const createdCustomer = new this.customerModel(customer);
    createdCustomer.save();
    return createdCustomer;
  }

  async editCustomer(@Body() customer: CustomerDTO, id: string) {
    await this.customerModel.findOneAndUpdate({ _id: id }, customer);
    return { success: true };
  }
  async deleteCustomer(id: string) {
    this.customerModel.deleteOne({ _id: id });
    return { success: true };
  }
  async deleteCustomers(req: any) {
    this.customerModel.deleteMany({
      _id: {
        $in: req.ids,
      },
    });
    return { success: true };
  }
}
