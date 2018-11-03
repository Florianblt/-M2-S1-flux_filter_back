import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { EntityModel } from '../shared/entity.model';

@Entity()
export class Flow extends EntityModel{
    @ApiModelProperty({ required: true })
    @Column({ length: 500, unique: true })
    name: string;

    @ApiModelProperty({ required: false })
    @Column({ length: 1000 })
    description: string;
}