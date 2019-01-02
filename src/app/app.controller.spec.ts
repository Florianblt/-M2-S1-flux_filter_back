import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Pagination } from './../pagination';
import { AppRepository } from './app.repository';
import { FlowRepository } from '../flow/flow.repository';
import { FlowService } from '../flow/flow.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let appRepository: AppRepository;
  let flowRepository: FlowRepository;
  let flowService: FlowService;

  beforeEach(() => {
    appRepository = new AppRepository();
    flowRepository = new FlowRepository();
    appService = new AppService(appRepository);
    flowService = new FlowService(flowRepository, appService);
    appController = new AppController(appService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
});
