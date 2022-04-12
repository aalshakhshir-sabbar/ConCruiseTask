import { Injectable } from '@nestjs/common';
import * as sqs from 'aws-sdk/clients/sqs';
import AWS from 'aws-sdk'

import { CsvParser } from 'nest-csv-parser';
const fs = require('fs');
import { IRide, Pointed } from './models/ride';
import { SortTrips } from './utils/SortingMechanismPoints';

const driversDummy = './db/dummy/driversdummy.csv';
const customersDummy = './db/dummy/customersdummy.csv';

@Injectable()
export class AppService {
  private readonly awsSqs;
  constructor(private readonly csvParser: CsvParser) {
    this.awsSqs = new sqs({
      endpoint: process.env.LOCALSTACK_URL,
      region: 'us-east-1',
    });
  }

  async parse(): Promise<Pointed[]> {
    const drivers: any = await this.getDrivers();
    const customers: any = await this.getCustomers();

    return SortTrips(customers, drivers);
  }

  async getDrivers() {
    const driversStream = fs.createReadStream(driversDummy);

    const drivers: any = await this.csvParser.parse(
      driversStream,
      IRide,
      null,
      null,
      {
        separator: ',',
      },
    );
    return drivers.list;
  }

  async getCustomers() {
    const customersStream = fs.createReadStream(customersDummy);

    const customers: any = await this.csvParser.parse(
      customersStream,
      IRide,
      null,
      null,
      {
        separator: ',',
      },
    );
    return customers.list;
  }

  async getFailedRides() {
    const result = await this.parse();
    return result.filter((i) => i?.points < 1);
  }

  async getBestRides() {
    return await this.parse();
  }
}
