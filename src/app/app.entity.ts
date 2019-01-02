import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { EntityModel } from '../shared/entity.model';
import { Flow } from '../flow/flow.entity';

@Entity()
export class App extends EntityModel {
  @ApiModelProperty({ required: true })
  @Column({ length: 500 })
  name: string;

  @ApiModelProperty({ required: true })
  @Column({ length: 1000 })
  description: string;

  @ApiModelProperty({ required: true })
  @Column({
    length: 1000,
    nullable: true,
  })
  technologies: string;

  @OneToMany(type => Flow, flow => flow.targetApp)
  incomingFlows: Flow[];

  @OneToMany(type => Flow, flow => flow.sourceApp)
  outcomingFlows: Flow[];
}
