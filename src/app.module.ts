import { Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './Customers/customer.module';
import { CommandModule } from 'nestjs-command';
import { AppCommand } from './app.command';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ExceptionsLoggerFilter } from './utils/exceptionLogger.filter';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CustomerModule,
    CsvModule,
    CommandModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb://localhost:27017/?directConnection=true&serverSelectionTimeoutMS=2000',
    ),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppCommand,
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
  ],
})
export class AppModule {}
