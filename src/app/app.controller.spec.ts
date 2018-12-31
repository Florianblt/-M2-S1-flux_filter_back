import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Pagination } from './../pagination';

class MockService {
  getAll = jest.fn();
  saveNewTechno = jest.fn();
  find = jest.fn();
  getOneById = jest.fn();
  updateName = jest.fn();
  deleteById = jest.fn();
}

class TestUserRepository {}

describe('App Controller', () => {
  let module: TestingModule;
  let appController: AppController;
  let appService: MockService;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useClass: MockService,
        },
      ],
    }).compile();
    appController = module.get(AppController);
    appService = module.get(AppService) as MockService;
  });
  it('should be defined', () => {
    const controller: AppController = module.get<AppController>(AppController);
    expect(controller).toBeDefined();
  });
});
