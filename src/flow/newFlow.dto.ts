import { IsString, MinLength, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class NewFlow{
    @ApiModelProperty({ required: true })
    @IsString()
    @MinLength(1)
    @Type(() => String)
    name: string;

    @ApiModelProperty({ required: true })
    @IsString()
    @MinLength(1)
    @Type(() => String)
    description: string;

    @ApiModelProperty({ required: true })
    @IsNumber()
    @MinLength(1)
    @Type(() => Number)
    sourceAppId: number;

    @ApiModelProperty({ required: true })
    @IsNumber()
    @MinLength(1)
    @Type(() => Number)
    targetAppId: number;
}