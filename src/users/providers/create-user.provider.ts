import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { CreateUserDto } from '../dtos/create-user.dto';
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User) private readonly userRepositry: Repository<User>,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
    private readonly mailService: MailService,
  ) {}
  public async createUser(createUserDto: CreateUserDto) {
    let existingUser = undefined;
    try {
      existingUser = await this.userRepositry.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'unable to process your request at moment please try again later',
        {
          description: 'error connecting to database',
        },
      );
    }

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    let newUser = this.userRepositry.create({
      ...createUserDto,
      password: (
        await this.hashingProvider.hashPassword(createUserDto.password)
      ).toString(),
    });
    try {
      newUser = await this.userRepositry.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'unable to process your request at moment please try again',
      );
    }

    try {
      await this.mailService.sendUseremail(newUser);
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
    return newUser;
  }
}
