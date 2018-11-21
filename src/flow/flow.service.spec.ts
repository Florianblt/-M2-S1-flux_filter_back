import { Test, TestingModule } from '@nestjs/testing';
import { FlowRepository } from './flow.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FlowService } from './flow.service';
import { AppService } from '../app/app.service';

class TestingMockService { }

class TestingAppService { }

describe('FlowService', () => {
  let service: FlowService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlowService,
        {
          provide: getRepositoryToken(FlowRepository),
          useClass: TestingMockService,
        },
        {
          provide: AppService,
          useClass: TestingAppService,
        },
      ],
    }).compile();
    service = module.get<FlowService>(FlowService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
