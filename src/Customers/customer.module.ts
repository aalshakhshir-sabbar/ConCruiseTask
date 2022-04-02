import { Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';
import { AppService } from 'src/app.service';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [CsvModule],
  controllers: [CustomerController],
  providers: [CustomerService, AppService],
})
export class CustomerModule {}
