import { Repository } from 'typeorm';
import { Flow } from './flow.entity';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import Optional from 'typescript-optional';

@EntityRepository(Flow)
export class FlowRepository extends Repository<Flow> {
  async findByName(name: string): Promise<Optional<Flow[]>> {
    return Optional.ofNullable(await this.find({ name }));
  }

  async findOneById(id: number): Promise<Optional<Flow>> {
    return Optional.ofNullable(await this.findOne(id));
  }
}
