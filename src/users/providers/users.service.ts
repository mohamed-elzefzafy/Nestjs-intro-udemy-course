import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-para.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import {  ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { CreateManyProvider } from './create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { FindUserByGoogleIdProvider } from './find-user-by-google-id.provider';
import { GoogleUser } from '../interfaces/google-user.interface';
import { CreateGoogleUserProvider } from './create-google-user.provider';


/**
 * user controller for the users table
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepositry: Repository<User>,
    @Inject(profileConfig.KEY)
    private readonly  profileConfigration : ConfigType<typeof profileConfig>,
    private readonly dataSource : DataSource,
    private readonly createManyProvider : CreateManyProvider,
    private readonly createUserProvider: CreateUserProvider,
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
    private readonly findUserByGoogleIdProvider : FindUserByGoogleIdProvider,
    private readonly createGoogleUserProvider : CreateGoogleUserProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {

    return this.createUserProvider.createUser(createUserDto);
  }
  /**
   * method to get users from the users table
   */
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
throw new HttpException({
  status : HttpStatus.MOVED_PERMANENTLY,
  error : "the api endpoint does not exist",
  fileName : "users.service.ts",
  lineNumber : 60,
},
HttpStatus.MOVED_PERMANENTLY,
{
  cause : new Error(),
  description : "api endpoint permanently moved"
}
)
  }

  /**
   * method to get one user by id
   */
  public async findOneById(id: number) {
    let user = undefined;

    try {
      user = await this.userRepositry.findOneBy({ id });
   
    } catch (error) {
      throw new RequestTimeoutException("unable to process your request at moment please try again")
    }

    if (!user) {
      throw new BadRequestException(`User with this id (${id}) not found`);
    }
    return user;
  }

  public async createManyUsers(createManyUsersDto: CreateManyUsersDto) {
    return this.createManyProvider.createManyUsers(createManyUsersDto);
  }

  public findOneByEmail(email: string) {
return this.findOneUserByEmailProvider.getUserByEmail(email)
  }

  public findOneByGoogleId(googleId: string) {
    return this.findUserByGoogleIdProvider.findOneByGoogleId(googleId);
  }

  public async createGoogleUser(googleUser : GoogleUser) {
 return await this.createGoogleUserProvider.createGoogleUser(googleUser);
  }
}
