import { Test, TestingModule } from '@nestjs/testing';
import { CsvModule } from 'nest-csv-parser';
import { CommandModule } from 'nestjs-command';
import { AppService } from '../../src/app.service';
import { customers } from '../../src/utils/mockData';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

describe('CustomerController', () => {
  let customerController: CustomerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CsvModule, CommandModule],
      controllers: [CustomerController],
      providers: [
        CustomerService,
        AppService,
        {
          provide: 'CustomerModel',
          useValue: {
            exec() {
              return customers;
            },
            deleteOne() {
              return { success: true };
            },
          },
        },
      ],
    }).compile();

    customerController = app.get<CustomerController>(CustomerController);
  });

  describe('customer controller', () => {
    it('should return all customers', () => {
      expect(customerController.getCustomers()).toEqual(customers);
    });
    it('should get customer by id', async () => {
      expect(
        await customerController.getCustomerById('624b2b2cf158f04b6a9832e6'),
      ).toEqual({
        _id: '624be54dcf86733d9278110e',
        id: 0,
        name: '231321',
        fullName: 'string',
        currentLocation: 'string',
        numberOfRides: 0,
        rating: 0,
        __v: 0,
      });
    });
    it('should delete customer by id', async () => {
      expect(
        await customerController.deleteCustomer('624be54dcf86733d9278110e'),
      ).toEqual({ success: true });
    });
  });
});
