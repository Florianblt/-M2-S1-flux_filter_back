import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
  BadRequestException,
} from '@nestjs/common';
import { AppRepository } from './app.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { App } from './app.entity';
import { NewApp } from './newApp.dto';
import { Pagination } from './../pagination';
import { AppPagination } from './app.pagination';

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
    let results: App[];
    let total: number;
    let request = this.appRepository
      .createQueryBuilder('app')
      .where('app.id is not null');
    if (!options.strict) {
      if (options.name != null)
        request = request.orWhere('LOWER(app.name) LIKE LOWER(:name)', {
          name: '%' + options.name + '%',
        });
      if (options.description != null) {
        request = request.orWhere(
          'LOWER(app.description) LIKE LOWER(:description)',
          {
            description: '%' + options.description + '%',
          },
        );
      }
      if (options.team != null)
        request = request.orWhere('LOWER(app.team) LIKE LOWER(:team)', {
          team: '%' + options.team + '%',
        });
      if (options.technologies != null)
        request = request.orWhere(
          'LOWER(app.technologies) LIKE LOWER(:technologies)',
          {
            technologies: '%' + options.technologies + '%',
          },
        );
    } else {
      if (options.name != null)
        request = request.andWhere('LOWER(app.name) LIKE LOWER(:name)', {
          name: '%' + options.name + '%',
        });
      if (options.description != null)
        request = request.andWhere(
          'LOWER(app.description) LIKE LOWER(:description)',
          {
            description: '%' + options.description + '%',
          },
        );
      if (options.team != null)
        request = request.andWhere('LOWER(app.team) LIKE LOWER(:team)', {
          team: '%' + options.team + '%',
        });
      if (options.technologies != null)
        request = request.andWhere(
          'LOWER(app.technologies) LIKE LOWER(:technologies)',
          {
            technologies: '%' + options.technologies + '%',
          },
        );
    }
    [results, total] = await request
      .take(options.limit)
      .skip(options.page)
      .orderBy('app.updateDate', 'DESC')
      .getManyAndCount();
    if (options.page > total && total != 0) throw new BadRequestException();
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
    app.technologies = newApp.technologies;
    app.team = newApp.team;
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

  async updateApp(idApp: number, newApp: NewApp): Promise<App> {
    const existingApp = await this.appRepository.findOneById(idApp);
    existingApp.ifPresentOrElse(
      async theApp => {
        theApp.name = newApp.name;
        theApp.description = newApp.description;
        theApp.team = newApp.team;
        theApp.technologies = newApp.technologies;
        await this.appRepository.save(theApp);
      },
      () => new NotFoundException(),
    );
    const theNewApp = await this.appRepository.findOneById(idApp);
    return theNewApp.orElseThrow(() => new NotFoundException());
  }
}
