import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CustomerModule } from '../src/Customers/customer.module';
import { INestApplication } from '@nestjs/common';
import { customers, failed, matches } from '../src/utils/mockData';
import { AppModule } from '../src/app.module';

describe('App', () => {
  let app: INestApplication;
  let appService = {};

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(appService)
      .useValue(appService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET match`, () => {
    return request(app.getHttpServer())
      .get('/match')
      .expect(200)
      .expect(matches);
  });
  it(`/GET failed`, () => {
    return request(app.getHttpServer())
      .get('/failed')
      .expect(200)
      .expect(failed);
  });
})