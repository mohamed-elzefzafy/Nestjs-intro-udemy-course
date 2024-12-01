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


/**
 * user controller for the users table
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userReposiyrty: Repository<User>,
    @Inject(profileConfig.KEY)
    private readonly  profileConfigration : ConfigType<typeof profileConfig>,
    private readonly dataSource : DataSource,
    private readonly createManyProvider : CreateManyProvider
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    let existingUser =  undefined;
    try {
      existingUser =  await this.userReposiyrty.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException("unable to process your request at moment please try again later" , {
        description : "error connecting to database",
      })
    }

    if (existingUser) {
      throw new BadRequestException("User already exists")
    }
    let newUser = this.userReposiyrty.create(createUserDto);
    try {
    newUser = await this.userReposiyrty.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException("unable to process your request at moment please try again")
    }

    return newUser;
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
      user = await this.userReposiyrty.findOneBy({ id });
   
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
}
