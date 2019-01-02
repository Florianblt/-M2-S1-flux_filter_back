import { ApiModelPropertyOptional } from '@nestjs/swagger';

export abstract class EntityDto {
  @ApiModelPropertyOptional()
  id?: number;

  @ApiModelPropertyOptional({ type: String, format: 'date-time' })
  createdAt?: Date;

  @ApiModelPropertyOptional({ type: String, format: 'date-time' })
  updatedAt?: Date;
}
