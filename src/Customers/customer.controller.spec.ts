import { Test, TestingModule } from '@nestjs/testing';
import { CsvModule } from 'nest-csv-parser';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

const customers = [
  {
    _id: '624b2b2cf158f04b6a9832e6',
    name: 'test',
    fullName: 'string',
    currentLocation: 'string',
    numberOfRides: 0,
    rating: 0,
    __v: 0,
    id: 0,
  },
  {
    _id: '624b2b2cf158f04b6a9832e8',
    name: '2',
    fullName: '2',
    currentLocation: '3',
    numberOfRides: 0,
    rating: 0,
    __v: 0,
  },
  {
    _id: '624b2b2cf158f04b6a9832ea',
    name: '2',
    fullName: '2',
    currentLocation: '3',
    numberOfRides: 0,
    rating: 0,
    __v: 0,
  },
  {
    _id: '624b2b2cf158f04b6a9832ec',
    name: '2',
    fullName: '2',
    currentLocation: '3',
    numberOfRides: 0,
    rating: 0,
    __v: 0,
  },
  {
    _id: '624b2b2cf158f04b6a9832ee',
    name: '2',
    fullName: '2',
    currentLocation: '3',
    numberOfRides: 0,
    rating: 0,
    __v: 0,
  },
  {
    _id: '624be54dcf86733d9278110e',
    id: 0,
    name: '231321',
    fullName: 'string',
    currentLocation: 'string',
    numberOfRides: 0,
    rating: 0,
    __v: 0,
  },
];

describe('CustomerController', () => {
  let customerController: CustomerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CsvModule],
      controllers: [CustomerController],
      providers: [CustomerService],
    }).compile();

    customerController = app.get<CustomerController>(CustomerController);
  });

  describe('customer controller', () => {
    it('should return all customers', () => {
      expect(customerController.getCustomers()).toEqual(customers);
    });
    it('should get customer by id', async () => {
      expect(
        await customerController.getCustomerById('624be54dcf86733d9278110e'),
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
