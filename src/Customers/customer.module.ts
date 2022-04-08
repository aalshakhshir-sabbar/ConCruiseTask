import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CsvModule } from 'nest-csv-parser';
import { CommandModule } from 'nestjs-command';
import { AppService } from 'src/app.service';
import { Customer, CustomerSchema } from 'src/schemas/customer.schema';
import { CustomerController } from './customer.controller';
import { CustomerRepo } from './customer.repo';
import { CustomerService } from './customer.service';
import { DeletedCustomerEvent } from './delete-customer.event';
import { DeleteCustomerHandler } from './delete-customer.handler';
import { CqrsModule } from '@nestjs/cqrs'
import { DeletedCustomerEventHandler } from './delete-customer-event.handler';

export const CommandHandlers = [DeleteCustomerHandler];
export const EventHandlers =  [DeletedCustomerEvent, DeletedCustomerEventHandler];

@Module({
  imports: [
    CsvModule,
    CommandModule,
    CqrsModule,
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, AppService, CustomerRepo, ...CommandHandlers, ...EventHandlers],
})
export class CustomerModule {}
