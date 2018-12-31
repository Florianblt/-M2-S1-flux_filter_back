import { Repository } from 'typeorm';
import { App } from './app.entity';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import Optional from 'typescript-optional';

@EntityRepository(App)
export class AppRepository extends Repository<App> {
  async findByName(name: string): Promise<Optional<App[]>> {
    return Optional.ofNullable(await this.find({ name }));
  }

  async findOneById(id: number): Promise<Optional<App>> {
    return Optional.ofNullable(await this.findOne(id));
  }
}
