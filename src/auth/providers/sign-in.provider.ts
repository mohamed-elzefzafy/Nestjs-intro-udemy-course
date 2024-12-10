import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly generateTokensProvider : GenerateTokensProvider,
  ) {}
  public async signin(signInDto: SignInDto) {
    const user = await this.usersService.findOneByEmail(signInDto.email);

    let isEqualPassword: boolean = false;
    try {
      isEqualPassword = await this.hashingProvider.comparePasswords(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'some thing went wrong',
      });
    }
    if (!isEqualPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return  await this.generateTokensProvider.generateTokens(user);

  }
}
