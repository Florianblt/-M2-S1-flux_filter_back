import { Connection, Repository } from 'typeorm';
import { App } from './app.entity';

export const appProviders = [
  {
    provide: 'AppRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(App),
    inject: ['DbConnectionToken'],
  },
];
