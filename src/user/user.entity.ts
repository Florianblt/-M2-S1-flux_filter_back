import { EntityModel } from '../shared/entity.model';
import { Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class User extends EntityModel {

    @ApiModelProperty({ required: true })
    @Column({ length: 100 })
    @IsEmail()
    email: string;

    @ApiModelProperty({ required: true })
    @Column({ length: 100 })
    password: string;

    @ApiModelProperty({ required: true })
    @Column({ length: 100 })
    firstName: string;

    @ApiModelProperty({ required: true })
    @Column({ length: 100 })
    lastName: string;
}