import { Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './Customers/customer.module';
import { CommandModule } from 'nestjs-command';
import { AppCommand } from './app.command';

@Module({
  imports: [CustomerModule, CsvModule, CommandModule],
  controllers: [AppController],
  providers: [AppService, AppCommand],
})
export class AppModule {}
