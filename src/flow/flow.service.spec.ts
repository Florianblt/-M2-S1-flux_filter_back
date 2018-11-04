import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flow } from './flow.entity';
import { FlowRepository } from './flow.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { FlowService } from './flow.service';

class TestingFlowRepository {
  findByName = jest.fn();
  save = jest.fn();
  find = jest.fn();
  remove = jest.fn();
}

describe('FlowService', () => {
  let service: FlowService;
  let testingRepository: TestingFlowRepository;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlowService,
        {
          provide: getRepositoryToken(FlowRepository),
          useClass: TestingFlowRepository,
        },
      ],
    }).compile();
    service = module.get<FlowService>(FlowService);
    testingRepository = module.get(getRepositoryToken(FlowRepository)) as TestingFlowRepository;
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
