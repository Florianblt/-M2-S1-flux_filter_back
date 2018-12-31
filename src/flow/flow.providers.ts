import { Connection, Repository } from 'typeorm';
import { Flow } from './flow.entity';

export const flowProviders = [
  {
    provide: 'FlowRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Flow),
    inject: ['DbConnectionToken'],
  },
];
