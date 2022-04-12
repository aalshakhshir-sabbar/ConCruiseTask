import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CsvModule } from 'nest-csv-parser';
import { CommandModule } from 'nestjs-command';
import { AppService } from 'src/app.service';
import { Customer, CustomerSchema } from 'src/schemas/customer.schema';
import { CustomerController } from './customer.controller';
import { CustomerRepo } from './customer.repo';
import { CustomerService } from './customer.service';
import { DeletedCustomerEvent } from './events/delete-customer.event';
import { DeleteCustomerHandler } from './commands/delete-customer.command.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { DeletedCustomerEventHandler } from './events/delete-customer-event.handler';
import { SqsModule } from '@ssut/nestjs-sqs';
import { CreateCustomerCommandHandler } from './commands/create-customer.command.handler';
import { CreateCustomerEventHandler } from './events/create-customer.event.handler';
import { getQueues } from 'src/main';

export const CommandHandlers = [
  DeleteCustomerHandler,
  CreateCustomerCommandHandler,
];
export const EventHandlers = [
  DeletedCustomerEvent,
  DeletedCustomerEventHandler,
  CreateCustomerEventHandler,
];

@Module({
  imports: [
    SqsModule.registerAsync({
      useFactory: () => {
        return {
          consumers: [
            {
              name: 'delete_user',
              queueUrl: 'http://localhost:4566/000000000000/delete_user',
            },
            {
              name: 'create_customer',
              queueUrl: 'http://localhost:4566/000000000000/create_customer',
              
            },
          ],
          producers: getQueues(),
        };
      },
    }),
    CsvModule,
    CommandModule,
    CqrsModule,
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    AppService,
    CustomerRepo,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class CustomerModule {}
