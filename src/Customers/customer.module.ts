import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CsvModule } from 'nest-csv-parser';
import { CommandModule } from 'nestjs-command';
import { AppService } from 'src/app.service';
import { Customer, CustomerSchema } from 'src/schemas/customer.schema';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [
    CsvModule,
    CommandModule,
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, AppService],
})
export class CustomerModule {}
