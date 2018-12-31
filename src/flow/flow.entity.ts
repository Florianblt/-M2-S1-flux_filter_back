import { Entity, Column, ManyToOne } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { EntityModel } from '../shared/entity.model';
import { App } from '../app/app.entity';

@Entity()
export class Flow extends EntityModel {
  @ApiModelProperty({ required: true })
  @Column({ length: 500 })
  name: string;

  @ApiModelProperty({ required: false })
  @Column({ length: 1000 })
  description: string;

  @ApiModelProperty({ required: false })
  @Column({
    length: 1000,
    nullable: true,
  })
  technologies: string;

  @ApiModelProperty({ required: true })
  @ManyToOne(type => App, app => app.outcomingFlows, { onDelete: 'CASCADE' })
  sourceApp: App;

  @ApiModelProperty({ required: true })
  @ManyToOne(type => App, app => app.incomingFlows, { onDelete: 'CASCADE' })
  targetApp: App;
}
