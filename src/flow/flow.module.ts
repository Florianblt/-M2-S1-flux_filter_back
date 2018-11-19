import { Module, forwardRef } from '@nestjs/common';
import { FlowService } from './flow.service';
import { SharedModule } from '../shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flow } from './flow.entity';
import { FlowRepository } from './flow.repository';
import { FlowController } from './flow.controller';
import { ApplicationModule } from '../app/app.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flow, FlowRepository]),
    SharedModule,
    forwardRef(() => ApplicationModule),
  ],
  exports: [ FlowService ],
  providers: [FlowService],
  controllers: [FlowController],
})
export class FlowModule {}
