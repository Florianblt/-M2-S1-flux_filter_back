import { Injectable, NotFoundException, Inject, forwardRef, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { AuthService } from '../shared/auth/auth.service';
import { RegisterDto } from './dto/register.dto';
import { compare, genSalt, hash } from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from 'shared/auth/interfaces/jwt-payload.interface';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserDto } from './dto/user.dto';
import { UserRole } from './user-role.enum';

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

    async register(dto: RegisterDto): Promise<UserDto>{
        const isUser = await this.userRepository.findOneWithEmail(dto.email);
        if (isUser.isPresent){
            const userDto = new UserDto();
            userDto.email = isUser.get().email;
            userDto.firstName = isUser.get().firstName;
            userDto.lastName = isUser.get().lastName;
            userDto.id = isUser.get().id;
            userDto.createdAt = isUser.get().creationDate;
            userDto.updatedAt = isUser.get().updateDate;
            return userDto;
        }
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
        const userDto = new UserDto();
        responseDto.token = await this.authService.signPayload(payload);
        const validateUser = await this.authService.validateUser(payload);
        userDto.email = validateUser.email;
        userDto.firstName = validateUser.firstName;
        userDto.lastName = validateUser.lastName;
        userDto.id = validateUser.id;
        userDto.createdAt = validateUser.creationDate;
        userDto.updatedAt = validateUser.updateDate;
        responseDto.userDto = userDto;
        return responseDto;

    }

    async promote(id: number): Promise<UserDto>{
        const user = await this.userRepository.findOneById(id);
        const userDto = new UserDto();
        user.ifPresentOrElse(theUser => {
            theUser.role = UserRole.Admin;
            userDto.email = theUser.email;
            userDto.firstName = theUser.firstName;
            userDto.lastName = theUser.lastName;
            userDto.id = theUser.id;
            userDto.createdAt = theUser.creationDate;
            userDto.updatedAt = theUser.updateDate;
        }, () => {
            throw new HttpException('', HttpStatus.NOT_FOUND);
        });
        return userDto;
    }
}
