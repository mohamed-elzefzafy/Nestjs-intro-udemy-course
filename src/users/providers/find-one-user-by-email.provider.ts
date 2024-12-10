import { BadRequestException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneUserByEmailProvider {
    constructor(
       @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}

   public async getUserByEmail(email: string) {
    let user :User |undefined;
    try {
        user = await this.userRepository.findOneBy({email});
    } catch (error) {
        throw new RequestTimeoutException(error , {description :"something went wrong"})
    }

    if (!user) {
 throw new BadRequestException("user not found");
    }
return user;
   }
}
