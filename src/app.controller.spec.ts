import { Test, TestingModule } from '@nestjs/testing';
import { CsvModule } from 'nest-csv-parser';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { failed, matches } from './utils/mockData';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CsvModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return the matching', async () => {
      expect(await appController.getBestRides()).toEqual(matches);
    });
    it('should get all failed rides', async () => {
      expect(await appController.getFailedRides()).toEqual(failed);
    });
  });
});
