import { Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './Customers/customer.module';
import { CommandModule } from 'nestjs-command';
import { AppCommand } from './app.command';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CustomerModule,
    CsvModule,
    CommandModule,
    MongooseModule.forRoot('mongodb://localhost:27017/?directConnection=true&serverSelectionTimeoutMS=2000'),
  ],
  controllers: [AppController],
  providers: [AppService, AppCommand],
})
export class AppModule {}
