import { EntityDto } from '../../shared/entity.dto';

import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class UserDto extends EntityDto {
  @ApiModelProperty()
  email: string;
  @ApiModelPropertyOptional()
  firstName?: string;
  @ApiModelPropertyOptional()
  lastName?: string;
}
