import { EntityModel } from '../shared/entity.model';
import { Entity, Column } from 'typeorm';
import { IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { UserRole } from './user-role.enum';

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

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
    nullable: true,
  })
  role?: UserRole;
}
