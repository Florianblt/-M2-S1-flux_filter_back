import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from 'shared/shared.module';
import { FlowModule } from './flow/flow.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from './app/app.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      // tslint:disable-next-line:radix
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: ['src/**/**.entity{.ts,.js}'],
      synchronize: true,
    }),
    SharedModule,
    FlowModule,
    ApplicationModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
