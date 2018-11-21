import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../shared/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from './user-role.enum';

@ApiUseTags('users')
@Controller('users')
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    @ApiResponse({
        status: 200,
        description: 'Register one user',
        type: UserDto,
        isArray: true,
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request.',
    })
    async register(@Body() dto: RegisterDto): Promise<UserDto> {
        return this.userService.register(dto);
    }

    @Post('login')
    @ApiResponse({
        status: 200,
        description: 'Log an user',
        type: UserDto,
        isArray: true,
    })
    @ApiResponse({
        status: 404,
        description: 'Bad request.',
    })
    async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
        return this.userService.login(dto);
    }

    @Post(':id/promote')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.Admin)
    @ApiResponse({
        status: 200,
        description: 'promote an user as admin',
        type: UserDto,
        isArray: true,
    })
    @ApiResponse({
        status: 404,
        description: 'Bad request.',
    })
    async promote(@Param('id') id: number): Promise<UserDto> {
        return this.userService.promote(id);
    }
}
