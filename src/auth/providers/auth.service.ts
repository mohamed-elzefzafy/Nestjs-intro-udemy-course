import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { FindOneUserByEmailProvider } from 'src/users/providers/find-one-user-by-email.provider';
import { SignInProvider } from './sign-in.provider';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { RefreshTokenProvider } from './refresh-token.provider';

@Injectable()
export class AuthService {
constructor( @Inject(forwardRef(() => UsersService)) private readonly usersService : UsersService,
private readonly signInProvider : SignInProvider,
private readonly RrfreshTokenProvider : RefreshTokenProvider
// @InjectRepository(User) private readonly usersRepository : Repository<User>

){}
    public signIn (signInDto : SignInDto) {
 return this.signInProvider.signin(signInDto);
    }

    public refreshToken(refreshTokenDto : RefreshTokenDto) {
     return this.RrfreshTokenProvider.refreshTokens(refreshTokenDto);
    }
    public isAuth(){
        return true;
    }
}
