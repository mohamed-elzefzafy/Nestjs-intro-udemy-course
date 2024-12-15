import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { FindUserByGoogleIdProvider } from './find-user-by-google-id.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { CreateUserProvider } from './create-user.provider';
import { CreateManyProvider } from './create-many.provider';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { MailService } from 'src/mail/providers/mail.service';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { BadRequestException } from '@nestjs/common';

type MockRepositry<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepositry = <T = any>(): MockRepositry<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});
describe('createUserProvider', () => {
  let provider: CreateUserProvider;
  let userRepositry : MockRepositry;
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    password: "password123",
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserProvider,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(User), useValue:createMockRepositry() },
        { provide: HashingProvider, useValue: {hashPassword : jest.fn(() => user.password)} },
        { provide: MailService, useValue: {sendUseremail : jest.fn(() => Promise.resolve())} },
      ],
    }).compile();
    provider = module.get<CreateUserProvider>(CreateUserProvider);
    userRepositry = module.get(getRepositoryToken(User));
  });

  test('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe("createUser" , () => {

    describe("when user not exists", () => {
     test("should create a user" , async() => {
      userRepositry.findOne.mockReturnValue(null);
      userRepositry.create.mockReturnValue(user);
      userRepositry.save.mockReturnValue(user);
      const newUser =  await provider.createUser(user);
      
      expect(userRepositry.findOne).toHaveBeenCalledWith({
        where: { email: user.email },
      })
      expect(userRepositry.create).toHaveBeenCalledWith(user);
      expect(userRepositry.save).toHaveBeenCalledWith(user)
     }) 
    })

    describe("when user exists", () => {
     test("should not create a user" , async() => {
      userRepositry.findOne.mockReturnValue(user.email);
      userRepositry.create.mockReturnValue(user);
      userRepositry.save.mockReturnValue(user);

      try {
        const newUser =  await provider.createUser(user);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException)
      }
     }) 
    })
  })
});
