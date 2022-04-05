import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CustomerModule } from '../src/Customers/customer.module';
import { INestApplication } from '@nestjs/common';
import { customers } from '../src/utils/mockData';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '@nestjs/passport';

describe('Customers', () => {
  let app: INestApplication;
  const customerService = {};
  let jwt = '';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CustomerModule, AppModule],
    })
      .overrideProvider(customerService)
      .useValue(customerService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test2',
        password: 'test',
      })
      .expect(200)
      .then((res) => {
        jwt = res.body.token;
      });
  });

  it(`/GET customers`, () => {
    return request(app.getHttpServer())
      .get('/customers')
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBeGreaterThanOrEqual(customers.length);
      });
  });
  it(`/GET customer by id`, () => {
    return request(app.getHttpServer())
      .get('/customers/624b2b2cf158f04b6a9832e6')
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200)
      .expect(customers[0]);
  });
  it(`/DELETE customer by id`, () => {
    return request(app.getHttpServer())
      .delete('/customers/624b2b2cf158f04b6a9832e6')
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200)
      .expect({ success: true });
  });
  it(`/POST customer`, () => {
    return request(app.getHttpServer())
      .post('/customers')
      .set('Authorization', `Bearer ${jwt}`)
      .send({
        name: 'Abood',
        fullName: 'Abood',
        currentLocation: 'Dubai',
        numberOfRides: 20,
        rating: 20,
      })
      .expect(201)
      .then((res) => {
        expect(res.body.name).toContain('Abood');
      });
  });
  afterAll(() => {
    app.close();
  });
});
