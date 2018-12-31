import { Test, TestingModule } from '@nestjs/testing';
import { FlowService } from './flow.service';
import { FlowController } from './flow.controller';
import { Pagination } from './../pagination';

class MockService {
  getAll = jest.fn();
  saveNewTechno = jest.fn();
  find = jest.fn();
  getOneById = jest.fn();
  updateName = jest.fn();
  deleteById = jest.fn();
}

describe('Flow Controller', () => {
  let module: TestingModule;
  let flowController: FlowController;
  let flowService: MockService;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [FlowController],
      providers: [
        {
          provide: FlowService,
          useClass: MockService,
        },
      ],
    }).compile();
    flowController = module.get(FlowController);
    flowService = module.get(FlowService) as MockService;
  });
  it('should be defined', () => {
    const controller: FlowController = module.get<FlowController>(
      FlowController,
    );
    expect(controller).toBeDefined();
  });
});
