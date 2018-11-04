import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flow } from './flow.entity';
import { NewFlow } from './newFlow.dto';
import { FlowRepository } from './flow.repository';

@Injectable()
export class FlowService {
    constructor(
        @InjectRepository(FlowRepository)
        private readonly flowRepository: FlowRepository,
    ) { }

    async findAll(): Promise<Flow[]> {
        return await this.flowRepository.find();
    }

    async createFlow(newFlow: NewFlow): Promise<Flow> {
        const existingFlow = await this.flowRepository.findByName(newFlow.name);
        if (existingFlow.isPresent)
            return existingFlow.get();
        else {
            let flow = new Flow();
            flow.name = newFlow.name;
            flow.description = newFlow.description;
            flow = await this.flowRepository.save(flow);
            return flow;
        }
    }
}
