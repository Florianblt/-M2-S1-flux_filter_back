import { Test, TestingModule } from '@nestjs/testing';
import { FlowRepository } from './flow.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FlowService } from './flow.service';
import { AppService } from '../app/app.service';
import { Pagination } from './../pagination';
import { FlowController } from './flow.controller';
import { AppRepository } from '../app/app.repository';

describe('FlowService', () => {
  let appService: AppService;
  let appRepository: AppRepository;
  let flowRepository: FlowRepository;
  let flowService: FlowService;

  beforeEach(() => {
    appRepository = new AppRepository();
    flowRepository = new FlowRepository();
    appService = new AppService(appRepository);
    flowService = new FlowService(flowRepository, appService);
  });

  it('should be defined', () => {
    expect(flowService).toBeDefined();
  });
});
