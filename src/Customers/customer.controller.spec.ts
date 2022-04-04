import { Test, TestingModule } from '@nestjs/testing';
import { CsvModule } from 'nest-csv-parser';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

const customers = [
  {
    id: '1',
    name: 'Sybyl Coxwell',
    locationLatitude: '67.1356306',
    locationLongitude: '20.6831751',
    numberOfRides: '35',
    rating: '3.5',
  },
  {
    id: '2',
    name: 'Carolus Boddis',
    locationLatitude: '27.950753',
    locationLongitude: '109.592921',
    numberOfRides: '99',
    rating: '3.6',
  },
  {
    id: '3',
    name: 'Sunny Beak',
    locationLatitude: '55.813957',
    locationLongitude: '37.626119',
    numberOfRides: '52',
    rating: '3.7',
  },
  {
    id: '4',
    name: 'Gracie Frunks',
    locationLatitude: '7.833333',
    locationLongitude: '-11.666667',
    numberOfRides: '67',
    rating: '3.5',
  },
  {
    id: '5',
    name: 'Nessy Stanway',
    locationLatitude: '31.2303904',
    locationLongitude: '121.4737021',
    numberOfRides: '46',
    rating: '3.7',
  },
  {
    id: '6',
    name: 'Artie Ovey',
    locationLatitude: '-33.047238',
    locationLongitude: '-71.6126885',
    numberOfRides: '77',
    rating: '4.6',
  },
  {
    id: '7',
    name: 'Harriette Adnam',
    locationLatitude: '49.3967841',
    locationLongitude: '14.4813772',
    numberOfRides: '25',
    rating: '3.6',
  },
  {
    id: '8',
    name: 'Anastassia Shepherdson',
    locationLatitude: '48.7700185',
    locationLongitude: '2.3508225',
    numberOfRides: '97',
    rating: '3.8',
  },
  {
    id: '9',
    name: 'Alfy Noell',
    locationLatitude: '53.5483785',
    locationLongitude: '10.078217',
    numberOfRides: '70',
    rating: '3.6',
  },
  {
    id: '10',
    name: 'Cory Crudge',
    locationLatitude: '22.791223',
    locationLongitude: '110.454459',
    numberOfRides: '18',
    rating: '3.9',
  },
  {
    id: '11',
    name: 'Jaymie Ware',
    locationLatitude: '57.1770444',
    locationLongitude: '26.0336703',
    numberOfRides: '78',
    rating: '4.1',
  },
  {
    id: '12',
    name: 'Correna Vella',
    locationLatitude: '8.0093062',
    locationLongitude: '-62.4015536',
    numberOfRides: '49',
    rating: '4',
  },
  {
    id: '13',
    name: 'Tiphany Patrick',
    locationLatitude: '23.791187',
    locationLongitude: '112.299103',
    numberOfRides: '38',
    rating: '3.6',
  },
  {
    id: '14',
    name: 'Nata Carvill',
    locationLatitude: '-4.8149897',
    locationLongitude: '-38.1054495',
    numberOfRides: '63',
    rating: '3.7',
  },
  {
    id: '15',
    name: 'Rutger Haysom',
    locationLatitude: '-10.5792295',
    locationLongitude: '-37.745028',
    numberOfRides: '53',
    rating: '3.8',
  },
  {
    id: '16',
    name: 'Roseanne Riguard',
    locationLatitude: '-10.5732996',
    locationLongitude: '-38.4429274',
    numberOfRides: '40',
    rating: '4.3',
  },
  {
    id: '17',
    name: 'Lilith Budnk',
    locationLatitude: '54.7180477',
    locationLongitude: '18.4086339',
    numberOfRides: '27',
    rating: '4.9',
  },
  {
    id: '18',
    name: 'Nessi Basezzi',
    locationLatitude: '42.3521585',
    locationLongitude: '44.6875131',
    numberOfRides: '53',
    rating: '3.6',
  },
  {
    id: '19',
    name: 'Terrie Larwell',
    locationLatitude: '52.1662684',
    locationLongitude: '109.7765741',
    numberOfRides: '12',
    rating: '4.5',
  },
  {
    id: '20',
    name: 'Tabb Waring',
    locationLatitude: '36.854929',
    locationLongitude: '114.503339',
    numberOfRides: '97',
    rating: '4.6',
  },
  {
    id: '21',
    name: 'Yelena Goodspeed',
    locationLatitude: '50.810462',
    locationLongitude: '16.2478969',
    numberOfRides: '81',
    rating: '3.7',
  },
  {
    id: '22',
    name: 'Almire Sutlieff',
    locationLatitude: '9.5113187',
    locationLongitude: '-75.3761952',
    numberOfRides: '36',
    rating: '4',
  },
  {
    id: '23',
    name: 'Derek Paley',
    locationLatitude: '28.213424',
    locationLongitude: '116.429948',
    numberOfRides: '64',
    rating: '4.2',
  },
  {
    id: '24',
    name: 'Muffin Gemson',
    locationLatitude: '44.9688472',
    locationLongitude: '-93.1315648',
    numberOfRides: '18',
    rating: '5',
  },
  {
    id: '25',
    name: 'Ondrea Watson',
    locationLatitude: '16.5347882',
    locationLongitude: '97.6032892',
    numberOfRides: '55',
    rating: '3.6',
  },
  {
    id: '26',
    name: 'Candice Sabati',
    locationLatitude: '40.105193',
    locationLongitude: '124.3602631',
    numberOfRides: '43',
    rating: '4.9',
  },
  {
    id: '27',
    name: 'Fania Kadwallider',
    locationLatitude: '50.6999479',
    locationLongitude: '13.8459307',
    numberOfRides: '42',
    rating: '4.2',
  },
  {
    id: '28',
    name: 'Hali Johnsey',
    locationLatitude: '49.2809997',
    locationLongitude: '17.876832',
    numberOfRides: '83',
    rating: '3.8',
  },
  {
    id: '29',
    name: 'Henri Rosentholer',
    locationLatitude: '27.517896',
    locationLongitude: '109.213644',
    numberOfRides: '83',
    rating: '3.5',
  },
  {
    id: '30',
    name: 'Kissee Broun',
    locationLatitude: '18.3999996',
    locationLongitude: '121.5166702',
    numberOfRides: '23',
    rating: '4.4',
  },
  {
    id: '31',
    name: 'Gunter Brimmacombe',
    locationLatitude: '59.2421439',
    locationLongitude: '14.2330452',
    numberOfRides: '91',
    rating: '4.3',
  },
  {
    id: '32',
    name: 'Louie Lattie',
    locationLatitude: '46.176012',
    locationLongitude: '129.425798',
    numberOfRides: '55',
    rating: '4.7',
  },
  {
    id: '33',
    name: 'Ardath Mundie',
    locationLatitude: '41.7721061',
    locationLongitude: '-72.7038047',
    numberOfRides: '47',
    rating: '3.5',
  },
  {
    id: '34',
    name: 'Jori Wrangle',
    locationLatitude: '10.3187555',
    locationLongitude: '123.906446',
    numberOfRides: '30',
    rating: '4.6',
  },
  {
    id: '35',
    name: 'Donavon Buckston',
    locationLatitude: '59.954927',
    locationLongitude: '40.2195978',
    numberOfRides: '23',
    rating: '3.7',
  },
  {
    id: '36',
    name: 'Saudra Patience',
    locationLatitude: '29.181201',
    locationLongitude: '110.138102',
    numberOfRides: '17',
    rating: '3.9',
  },
  {
    id: '37',
    name: 'Nicola Masser',
    locationLatitude: '19.4102526',
    locationLongitude: '-99.0073673',
    numberOfRides: '80',
    rating: '3.6',
  },
  {
    id: '38',
    name: 'Joli Maffi',
    locationLatitude: '39.2476884',
    locationLongitude: '21.1614231',
    numberOfRides: '9',
    rating: '4.4',
  },
  {
    id: '39',
    name: 'Elysha Prop',
    locationLatitude: '59.3525393',
    locationLongitude: '18.0191452',
    numberOfRides: '77',
    rating: '3.6',
  },
  {
    id: '40',
    name: 'Meggie Illston',
    locationLatitude: '40.3779093',
    locationLongitude: '-7.8440342',
    numberOfRides: '26',
    rating: '3.8',
  },
];

describe('CustomerController', () => {
  let customerController: CustomerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CsvModule],
      controllers: [CustomerController],
      providers: [CustomerService],
    }).compile();

    customerController = app.get<CustomerController>(CustomerController);
  });

  describe('customer controller', () => {
    it('should return all customers', () => {
      expect(customerController.getCustomers()).toEqual(customers);
    });
    it('should get customer by id', async () => {
      expect(await customerController.getCustomerById(1)).toEqual({
        id: '1',
        name: 'Sybyl Coxwell',
        locationLatitude: '67.1356306',
        locationLongitude: '20.6831751',
        numberOfRides: '35',
        rating: '3.5',
      });
    });
    it('should delete customer by id', async () => {
      expect(await customerController.deleteCustomer(2)).toEqual(
        'deleted customer with id: 2',
      );
    });
  });
});
