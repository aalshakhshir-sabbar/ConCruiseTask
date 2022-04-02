import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from '../src/Customers/customer.controller';
import { CustomerService } from '../src/Customers/customer.service';

describe('CustomerController', () => {
  let customerController: CustomerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [CustomerService],
    }).compile();

    customerController = app.get<CustomerController>(CustomerController);
  });

  describe('root', () => {
    it('should return list of customers"', () => {
      expect(customerController.getCustomers()).toBe('');
    });
  });
});
