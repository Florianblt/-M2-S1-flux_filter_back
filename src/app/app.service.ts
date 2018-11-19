import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { App } from './app.entity';
import { NewApp } from './newApp.dto';
import { FlowService } from '../flow/flow.service';

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(AppRepository)
        private readonly appRepository: AppRepository,
        @Inject(forwardRef(() => FlowService))
        private readonly flowService: FlowService,
    ) { }

    async findAll(): Promise<App[]> {
        return await this.appRepository.find();
    }

    async findById(id: number): Promise<App>{
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
