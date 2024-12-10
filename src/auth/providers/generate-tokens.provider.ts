import { Inject, Injectable } from '@nestjs/common';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

@Injectable()
export class GenerateTokensProvider {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY) private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,  
    ){}

    public async signinToken<T> (userId : number , expireIn : number , payLoad ?: T) {

        return await this.jwtService.signAsync(
            { sub: userId, ...payLoad} ,
            {
              audience: this.jwtConfiguration.audience,
              issuer: this.jwtConfiguration.issuer,
              secret: this.jwtConfiguration.secret,
              expiresIn: expireIn,
            },
          );
    }

    public async generateTokens(user: User){
      const [accessToken , refreshToken] = await Promise.all([
                    // generate accessToken 
     this.signinToken<Partial<ActiveUserData>>(user.id , this.jwtConfiguration.accesTokenTtl, {email : user.email}),

     // generate refreshtoken
     this.signinToken(user.id , this.jwtConfiguration.JWT_REFRESH_TOKEN_TTL)
        ])
return {accessToken , refreshToken}
    }
}
