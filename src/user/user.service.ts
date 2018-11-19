import { Injectable, NotFoundException, Inject, forwardRef, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { AuthService } from '../shared/auth/auth.service';
import { RegisterDto } from './dto/register.dto';
import { compare, genSalt, hash } from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from 'shared/auth/interfaces/jwt-payload.interface';
import { LoginResponseDto } from './dto/token-response.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        @Inject(forwardRef(() => AuthService))
        readonly authService: AuthService,
    ){}

    async getAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOneById(id: number): Promise<User> {
        const theUser = await this.userRepository.findOneById(id);
        return theUser.orElseThrow(() => new NotFoundException());
    }

    async findOneWithEmail(email: string): Promise<User> {
        const theUser = await this.userRepository.findOneWithEmail(email);
        return theUser.orElseThrow(() => new NotFoundException());
    }

    async register(dto: RegisterDto): Promise<User>{
        const isUser = await this.userRepository.findOneWithEmail(dto.email);
        if (isUser.isPresent)
            return isUser.get();
        else {
            const newUser = new User();
            newUser.email = dto.email.toLocaleLowerCase();
            newUser.firstName = dto.firstName;
            newUser.lastName = dto.lastName;
            const salt = await genSalt(10);
            newUser.password = await hash(dto.password, salt);
            return this.userRepository.save(newUser);
        }
    }

    async login(dto: LoginDto): Promise<LoginResponseDto> {
        const user = await this.findOneWithEmail(dto.email);
        if (!user) {
            throw new HttpException('Invalid crendentials', HttpStatus.NOT_FOUND);
        }
        const isMatch = await compare(dto.password, user.password);
        if (!isMatch) {
            throw new HttpException('Invalid crendentials', HttpStatus.BAD_REQUEST);
        }
        const payload: JwtPayload = {
            email: user.email,
            password: user.password,
        };
        const responseDto: LoginResponseDto = new LoginResponseDto();
        responseDto.token = await this.authService.signPayload(payload);
        responseDto.user = await this.authService.validateUser(payload);
        return responseDto;

    }
}
