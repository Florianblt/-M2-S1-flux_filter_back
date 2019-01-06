import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flow } from './flow.entity';
import { NewFlow } from './newFlow.dto';
import { AppService } from '../app/app.service';
import { FlowRepository } from './flow.repository';
import { Pagination } from './../pagination';
import { FlowPagination } from './flow.pagination';

@Injectable()
export class FlowService {
  constructor(
    @InjectRepository(FlowRepository)
    private readonly flowRepository: FlowRepository,
    @Inject(forwardRef(() => AppService))
    private readonly appService: AppService,
  ) {}

  async findAll(): Promise<Flow[]> {
    return await this.flowRepository.find();
  }

  async paginate(options: FlowPagination): Promise<Pagination<Flow>> {
    let results: Flow[];
    let total: number;
    let request = this.flowRepository
      .createQueryBuilder('flow')
      .leftJoinAndSelect('flow.sourceApp', 'sourceApp')
      .leftJoinAndSelect('flow.targetApp', 'targetApp');
    if (options.strict) {
      console.log(options);
      if (options.name != null)
        request = request.andWhere('LOWER(flow.name) LIKE LOWER(:name)', {
          name: '%' + options.name + '%',
        });
      if (options.description != null)
        request = request.andWhere(
          'LOWER(flow.description) LIKE LOWER(:description)',
          {
            description: '%' + options.description + '%',
          },
        );
      if (options.technologies != null)
        request = request.andWhere(
          'LOWER(flow.technologies) LIKE LOWER(:technologies)',
          {
            technologies: '%' + options.technologies + '%',
          },
        );
      if (options.sourceAppName != null)
        request = request.andWhere(
          'LOWER(sourceApp.name) LIKE LOWER(:sourceAppName)',
          {
            sourceAppName: '%' + options.sourceAppName + '%',
          },
        );
      if (options.targetAppName != null)
        request = request.andWhere(
          'LOWER(targetApp.name) LIKE LOWER(:targetAppName)',
          {
            targetAppName: '%' + options.targetAppName + '%',
          },
        );
    } else {
      if (!options.name != null)
        request = request.orWhere('LOWER(flow.name) LIKE LOWER(:name)', {
          name: '%' + options.name + '%',
        });
      if (options.description != null)
        request = request.orWhere(
          'LOWER(flow.description) LIKE LOWER(:description)',
          {
            description: '%' + options.description + '%',
          },
        );
      if (options.technologies != null)
        request = request.orWhere(
          'LOWER(flow.technologies) LIKE LOWER(:technologies)',
          {
            technologies: '%' + options.technologies + '%',
          },
        );
      if (options.sourceAppName != null)
        request = request.orWhere(
          'LOWER(sourceApp.name) LIKE LOWER(:sourceAppName)',
          {
            sourceAppName: '%' + options.sourceAppName + '%',
          },
        );
      if (options.targetAppName != null)
        request = request.orWhere(
          'LOWER(targetApp.name) LIKE LOWER(:targetAppName)',
          {
            targetAppName: '%' + options.targetAppName + '%',
          },
        );
    }
    [results, total] = await request
      .take(options.limit)
      .skip(options.page)
      .orderBy('flow.updateDate', 'DESC')
      .getManyAndCount();
    if (options.page >= total && total != 0) throw new BadRequestException();
    return new Pagination<Flow>({ results, total });
  }

  async findById(id: number): Promise<Flow> {
    const theFlow = await this.flowRepository.findOneById(id);
    return theFlow.orElseThrow(() => new NotFoundException());
  }

  async findByName(flowName: string): Promise<Flow[]> {
    const flows = await this.flowRepository.findByName(flowName);
    return flows.orElseThrow(() => new NotFoundException());
  }

  async createFlow(newFlow: NewFlow): Promise<Flow> {
    const existingSourceApp = await this.appService.findById(
      newFlow.sourceAppId,
    );
    const existingTargetApp = await this.appService.findById(
      newFlow.targetAppId,
    );
    let flow = new Flow();
    flow.name = newFlow.name;
    flow.description = newFlow.description;
    flow.technologies = newFlow.technologies;
    flow.sourceApp = existingSourceApp;
    flow.targetApp = existingTargetApp;
    flow = await this.flowRepository.save(flow);
    return flow;
  }

  async deleteFlow(idFlow: number): Promise<void> {
    const existingFlow = await this.flowRepository.findOneById(idFlow);
    existingFlow.ifPresentOrElse(
      async theFlow => {
        await this.flowRepository.remove(theFlow);
      },
      () => new NotFoundException(),
    );
  }

  async updateFlow(idFlow: number, newFlow: NewFlow): Promise<Flow> {
    const existingFlow = await this.flowRepository.findOneById(idFlow);
    existingFlow.ifPresentOrElse(
      async theFlow => {
        const existingSourceApp = await this.appService.findById(
          newFlow.sourceAppId,
        );
        const existingTargetApp = await this.appService.findById(
          newFlow.targetAppId,
        );
        theFlow.name = newFlow.name;
        theFlow.description = newFlow.description;
        theFlow.technologies = newFlow.technologies;
        theFlow.sourceApp = existingSourceApp;
        theFlow.targetApp = existingTargetApp;
        await this.flowRepository.save(theFlow);
      },
      () => new NotFoundException(),
    );
    const theNewFlow = await this.flowRepository.findOneById(idFlow);
    return theNewFlow.orElseThrow(() => new NotFoundException());
  }
}
