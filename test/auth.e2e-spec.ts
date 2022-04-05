import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { failed, matches } from '../src/utils/mockData';
import { AppModule } from '../src/app.module';

describe('Authentication', () => {
  let app: INestApplication;
  const authService = {};
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(authService)
      .useValue(authService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET auth/register`, () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'test2' + Math.random(),
        password: 'test',
      })
      .expect(201);
  });
  it(`/GET auth/login user in`, () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test2',
        password: 'test',
      })
      .expect(200);
  });
});
