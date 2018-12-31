import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../shared/auth/auth.service';

class MockService {
  getAll = jest.fn();
  saveNewTechno = jest.fn();
  find = jest.fn();
  getOneById = jest.fn();
  updateName = jest.fn();
  deleteById = jest.fn();
}

class TestingAuthService {}

describe('User Controller', () => {
  let module: TestingModule;
  let userController: UserController;
  let userService: MockService;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useClass: MockService,
        },
        {
          provide: AuthService,
          useClass: TestingAuthService,
        },
      ],
    }).compile();
    userController = module.get(UserController);
    userService = module.get(UserService) as MockService;
  });
  it('should be defined', () => {
    const controller: UserController = module.get<UserController>(
      UserController,
    );
    expect(controller).toBeDefined();
  });
});
