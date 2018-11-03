import { Module } from '@nestjs/common';
import { FlowService } from './flow.service';
import { SharedModule } from '../shared/shared.module';
import { FlowController } from './flow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flow } from './flow.entity';
import { FlowRepository } from './flow.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flow, FlowRepository]),
    SharedModule,
  ],
  providers: [FlowService],
  controllers: [FlowController],
})
export class FlowModule {}
