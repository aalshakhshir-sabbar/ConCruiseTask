import { Body, Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { CustomerDTO } from 'src/models/customer';

@Injectable()
export class CustomerService {
  customers: any = this.appService.getCustomers();
  constructor(private readonly appService: AppService) {
    this.customers = this.appService.getCustomers();
  }
  async getCustomers() {
    return this.customers;
  }

  async getCustomer(id: number) {
    const cust = await this.getCustomers()
   return cust?.find(i => i?.id === id)
  }


  async addCustomer(customer: CustomerDTO) {
    const cust = await this.getCustomers()
    this.customers = [cust,  {
      id: +cust[cust?.length -1]?.id + 1,
      fullName: customer.name,
      currentLocation: customer.currentLocation,
      numberOfRides: customer.numberOfRides,
      rating: customer.rating
    }]
    return "created new customer " + JSON.stringify(customer);
  }

  async editCustomer(@Body() customer: CustomerDTO, id: number) {
    const cust = await this.getCustomers()
    this.customers = cust.map(i => {
      if (i.id === id)  {
        return {...customer, id}
      }
      return i;
    })
    return "updated customer with id: " + id;
  }
  async deleteCustomer(id: number) {
    const cust = await this.getCustomers()
    this.customers = cust.filter(i => i?.id !== id)
    return "deleted customer with id: " + id;

  }
  async deleteCustomers(req: any) {
    const cust = await this.getCustomers()
    const ids: any = req.body.ids
    this.customers = cust?.filter(i => !ids.includes(i.id))
    return "deleted all customers with ids: " + ids;
  }
}
