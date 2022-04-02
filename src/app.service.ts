import { Injectable } from '@nestjs/common';
import { CsvParser } from 'nest-csv-parser';
const fs = require('fs')
import { IRide, Pointed } from './models/ride';
import { SortTrips } from './utils/SortingMechanismPoints';

const driversDummy = './db/dummy/driversdummy.csv'
const customersDummy = './db/dummy/customersdummy.csv'

@Injectable()
export class AppService {
  constructor(private readonly csvParser: CsvParser) {

  }

  async parse(): Promise<Pointed[]> {
    const driversStream = fs.createReadStream(driversDummy)

    const drivers: any = this.getDrivers();
    const customers: any = this.getCustomers()

    return SortTrips(customers, drivers)
  }


  async getDrivers() {
    const driversStream = fs.createReadStream(driversDummy)

    const drivers: any = await this.csvParser.parse(driversStream, IRide, null, null, {
      separator: ','
    })
    return drivers.list;
  }

  async getCustomers() {
    const customersStream = fs.createReadStream(customersDummy)

    const customers: any = await this.csvParser.parse(customersStream, IRide, null, null, {
      separator: ','
    })
    return customers.list;
  }

  getBestRides() {
    return this.parse().then((res: any[]) => {
      return res;
    })
  }
}
