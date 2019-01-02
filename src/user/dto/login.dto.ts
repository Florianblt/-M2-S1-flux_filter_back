import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiModelProperty({ required: true })
  email: string;

  @ApiModelProperty({
    required: true,
    minLength: 6,
    type: String,
    format: 'password',
  })
  password: string;
}
