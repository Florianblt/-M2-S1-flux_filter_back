import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FlowService } from '../flow/flow.service';
import { Pagination } from './../pagination';

class TestingMockService {}

class TestingFlowService {}

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getRepositoryToken(AppRepository),
          useClass: TestingMockService,
        },
        {
          provide: FlowService,
          useClass: TestingFlowService,
        },
      ],
    }).compile();
    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
