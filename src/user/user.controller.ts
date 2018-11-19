import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import { App } from 'app/app.entity';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/token-response.dto';

@ApiUseTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    @ApiResponse({
        status: 200,
        description: 'Register one user',
        type: App,
        isArray: true,
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request.',
    })
    async register(@Body() dto: RegisterDto): Promise<User> {
        return this.userService.register(dto);
    }

    @Post('login')
    @ApiResponse({
        status: 200,
        description: 'Log an user',
        type: App,
        isArray: true,
    })
    @ApiResponse({
        status: 404,
        description: 'Bad request.',
    })
    async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
        return this.userService.login(dto);
    }
}
