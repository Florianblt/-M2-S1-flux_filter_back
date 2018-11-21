import { ApiModelProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class LoginResponseDto {
    @ApiModelProperty() token: string;

    @ApiModelProperty()
    userDto: UserDto;
}
