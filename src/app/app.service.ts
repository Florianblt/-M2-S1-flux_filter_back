import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { AppRepository } from './app.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { App } from './app.entity';
import { NewApp } from './newApp.dto';
import { FlowService } from '../flow/flow.service';
import { PaginationOptions } from 'pagination/pagination.options';
import { Pagination } from './../pagination';
import { AppPagination } from './app.pagination';
import { Like } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AppRepository)
    private readonly appRepository: AppRepository,
  ) {}

  async findAll(): Promise<App[]> {
    return await this.appRepository.find();
  }

  async paginate(options: AppPagination): Promise<Pagination<App>> {
    const [results, total] = await this.appRepository.findAndCount({
      take: options.limit,
      skip: options.page,
      where: {
        name: Like('%' + options.name + '%'),
        description: Like('%' + options.description + '%'),
        technologies: Like('%' + options.technologies + '%'),
      },
    });
    return new Pagination<App>({ results, total });
  }

  async findById(id: number): Promise<App> {
    const theApp = await this.appRepository.findOneById(id);
    return theApp.orElseThrow(() => new NotFoundException());
  }

  async findByName(name: string): Promise<App[]> {
    const apps = await this.appRepository.findByName(name);
    return apps.orElseThrow(() => new NotFoundException());
  }

  async createApp(newApp: NewApp): Promise<App> {
    let app = new App();
    app.name = newApp.name;
    app.description = newApp.description;
    app = await this.appRepository.save(app);
    return app;
  }

  async deleteApp(idApp: number): Promise<void> {
    const existingApp = await this.appRepository.findOneById(idApp);
    existingApp.ifPresentOrElse(
      async theApp => await this.appRepository.remove(theApp),
      () => new NotFoundException(),
    );
  }
}
