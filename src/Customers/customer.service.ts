import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Injectable()
export class CustomerService {
  customers: any = this.appService.getCustomers();
  constructor(private readonly appService: AppService) {
  }
  async getCustomers() {
    return this.customers;
  }

  addCustomer(req: Request): void {
    const customer: any = req.body;
    this.customers = [...this.customers,  {
      id: this.customers[this.customers.length -1].id + 1,
      fullName: customer.name,
      currentLocation: customer.currentLocation,
      numberOfRides: customer.numberOfRides,
      rating: customer.rating
    }]
  }
  editCustomer(req: Request): void {
    const customer: any = req.body;
    this.customers = this.customers.map(i => {
      if (i.id === customer.id)  {
        return {...customer}
      }
      return i;
    })
    return customer;
  }
  deleteCustomer(id: number): void {
    this.customers = this.customers.filter(i => i?.id !== id)
  }
  deleteCustomers(req: any): void {
    const ids: any = req.body.ids
    this.customers = this.customers.filter(i => !ids.includes(i.id))
  }
}
