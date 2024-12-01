import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class CreateManyProvider {
  constructor(private readonly dataSource: DataSource) {}
  public async createManyUsers(createManyUsersDto: CreateManyUsersDto) {
    let newUsers: User[] = [];
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException(
        'unable to process your request at moment please try again 44',
      );
    }

    try {
      for (const user of createManyUsersDto.users) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new ConflictException("can't complete the transaction" , {
        description : String(error)
      })
    } finally {
     try {
        await queryRunner.release();
     } catch (error) {
        throw new RequestTimeoutException(
            'could not release the connecction',
            {
                description : String(error) 
            }
          ); 
     }
    }
    return newUsers;
  }
}
