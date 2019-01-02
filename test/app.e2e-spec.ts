import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ApplicationModule } from '../src/app/app.module';
import { AppService } from '../src/app/app.service';
import { INestApplication } from '@nestjs/common';

describe('Cats', () => {
  let app: INestApplication;
  let appService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ApplicationModule],
    })
      .overrideProvider(AppService)
      .useValue(appService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET cats`, () => {
    return request(app.getHttpServer())
      .get('/apps')
      .expect(200)
      .expect({
        data: appService.findAll(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
