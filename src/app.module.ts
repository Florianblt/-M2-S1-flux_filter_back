import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { FlowModule } from './flow/flow.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    SharedModule,
    FlowModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
