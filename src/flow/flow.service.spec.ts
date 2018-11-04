import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flow } from './flow.entity';
import { FlowRepository } from './flow.repository';
import { SharedModule } from '../shared/shared.module';
import { FlowService } from './flow.service';

describe('FlowService', () => {
  let service: FlowService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([Flow, FlowRepository]),
        SharedModule,
      ],
      providers: [FlowService],
    }).compile();
    service = module.get<FlowService>(FlowService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
