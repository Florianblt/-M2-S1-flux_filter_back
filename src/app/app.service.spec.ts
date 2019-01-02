import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FlowService } from '../flow/flow.service';
import { Pagination } from './../pagination';
import { FlowRepository } from '../flow/flow.repository';

describe('AppService', () => {
  let appService: AppService;
  let appRepository: AppRepository;
  let flowRepository: FlowRepository;

  beforeEach(() => {
    appRepository = new AppRepository();
    flowRepository = new FlowRepository();
    appService = new AppService(appRepository);
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });
});
