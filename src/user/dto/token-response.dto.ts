import { ApiModelProperty } from '@nestjs/swagger';
import { User } from 'user/user.entity';

export class LoginResponseDto {
    @ApiModelProperty() token: string;

    @ApiModelProperty({ type: User })
    user: User;
}
