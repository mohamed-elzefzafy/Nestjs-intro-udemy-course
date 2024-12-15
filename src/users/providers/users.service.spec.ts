import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { FindUserByGoogleIdProvider } from './find-user-by-google-id.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { CreateUserProvider } from './create-user.provider';
import { CreateManyProvider } from './create-many.provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  beforeEach(async () => {

    const mockCreateUserProvider : Partial<CreateUserProvider> = {
 createUser : (createUserDto : CreateUserDto) => Promise.resolve({
   id :12,
   firstName : createUserDto.firstName,
   lastName : createUserDto.lastName,
   email : createUserDto.email,
   password : createUserDto.password,
 })    


}

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: CreateUserProvider, useValue: mockCreateUserProvider },
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: CreateGoogleUserProvider, useValue: {} },
        { provide: FindUserByGoogleIdProvider, useValue: {} },
        { provide: FindOneUserByEmailProvider, useValue: {} },
        { provide: CreateManyProvider, useValue: {} },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe("createUser" , () => {
    test("should be defined", () => {
        expect(service.createUser).toBeDefined();
    });

    test("should call create user method", async() => {
    let user = await service.createUser({
        firstName : "John",
        lastName : "Doe",
        email : "johndoe@example.com",
        password : "password123",
    });
    expect(user.firstName).toEqual("John");
    })
  })
});
