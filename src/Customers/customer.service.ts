import { Body, Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { CustomerDTO } from 'src/models/customer';

@Injectable()
export class CustomerService {
  customers: any = []
  constructor(private readonly appService: AppService) {
    this.customers = this.appService.getCustomers();
  }
  async getCustomers() {
    return this.customers;
  }

  async getCustomer(id: number) {
   return this.customers;
  }


  async addCustomer(customer: CustomerDTO) {
    this.customers = [this.customers,  {
      id: +this.customers[this.customers.length -1].id + 1,
      fullName: customer.name,
      currentLocation: customer.currentLocation,
      numberOfRides: customer.numberOfRides,
      rating: customer.rating
    }]
    return "created new customer"
  }

  async editCustomer(@Body() customer: CustomerDTO, id: number) {
    this.customers = this.customers.map(i => {
      if (i.id === id)  {
        return {...customer, id}
      }
      return i;
    })
    return "updated customer with id: " + id;
  }
  async deleteCustomer(id: number) {
    this.customers = this.customers.filter(i => i?.id !== id)
    return "deleted customer with id: " + id;

  }
  async deleteCustomers(req: any) {
    const ids: any = req.body.ids
    this.customers = this.customers.filter(i => !ids.includes(i.id))
    return "deleted all customers with ids: " + ids;
  }
}
