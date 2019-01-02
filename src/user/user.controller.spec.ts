import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../shared/auth/auth.service';
import { UserRepository } from './user.repository';

describe('User Controller', () => {
  let userController: UserController;
  let userService: UserService;
  let userRepository: UserRepository;
  let authService: AuthService;

  beforeAll(async () => {
    userRepository = new UserRepository();
    userService = new UserService(userRepository, authService);
    userController = new UserController(userService);
  });
  it('should be defined', () => {
    expect(userController).toBeDefined();
  });
});
