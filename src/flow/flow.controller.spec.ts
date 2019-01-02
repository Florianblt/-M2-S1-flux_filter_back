import { FlowService } from './flow.service';
import { FlowController } from './flow.controller';
import { AppController } from '../app/app.controller';
import { AppService } from '../app/app.service';
import { AppRepository } from '../app/app.repository';
import { FlowRepository } from './flow.repository';

describe('Flow Controller', () => {
  let flowController: FlowController;
  let appService: AppService;
  let appRepository: AppRepository;
  let flowRepository: FlowRepository;
  let flowService: FlowService;

  beforeEach(() => {
    appRepository = new AppRepository();
    flowRepository = new FlowRepository();
    appService = new AppService(appRepository);
    flowService = new FlowService(flowRepository, appService);
    flowController = new FlowController(flowService);
  });

  it('should be defined', () => {
    expect(flowController).toBeDefined();
  });
});
