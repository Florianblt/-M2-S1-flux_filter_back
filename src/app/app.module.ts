import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'shared/shared.module';
import { App } from './app.entity';
import { FlowModule } from '../flow/flow.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([App, AppRepository]),
    SharedModule,
    forwardRef(() => FlowModule),
  ],
  exports: [AppService],
  providers: [AppService],
  controllers: [AppController],
})
export class ApplicationModule {}
