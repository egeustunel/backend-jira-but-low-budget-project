import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from './repositories/user';
import { ClientGuard } from '../../libs/guards/auth';
import { JwtService } from '@nestjs/jwt';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        JwtService,
        {
          provide: UserRepository,
          useValue: {
            store: jest.fn(),
            findAll: jest.fn(),
            findByEmail: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(ClientGuard)
      .useValue({
        canActivate: jest.fn().mockReturnValue(true),
      })
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      jest
        .spyOn(userService, 'create')
        .mockResolvedValueOnce({ id: 1, ...createUserDto });
      const expectedResult = { id: 1, ...createUserDto };

      expect(await userController.create(createUserDto)).toEqual(
        expectedResult,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockUsers = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          password: 'hashedPassword',
        },
        {
          id: 2,
          name: 'Jane Doe',
          email: 'jane@example.com',
          password: 'hashedPassword',
        },
      ];

      jest.spyOn(userService, 'findAll').mockResolvedValueOnce(mockUsers);

      expect(await userController.findAll()).toEqual(mockUsers);
    });
  });

  describe('login', () => {
    it('should login and return user data with tokens', async () => {
      const loginDto: LoginDto = {
        email: 'john@example.com',
        password: 'password123',
      };

      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedPassword',
      };
      const mockTokens = {
        accessToken: 'mockAccessToken',
        refreshToken: 'mockRefreshToken',
      };

      jest
        .spyOn(userService, 'login')
        .mockResolvedValueOnce({ ...mockUser, ...mockTokens });

      expect(await userController.login(loginDto)).toEqual({
        ...mockUser,
        ...mockTokens,
      });
    });
  });
});
