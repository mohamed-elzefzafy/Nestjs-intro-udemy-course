import { forwardRef, Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';
import { User } from 'src/users/user.entity';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigration: ConfigType<typeof jwtConfig>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}
  onModuleInit() {
    const clentId = this.jwtConfigration.googleClientId;
    const clentSecret = this.jwtConfigration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clentId, clentSecret);
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
try {
       // Verify the Google Token Sent By User
       const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });
      console.log('loginTicket', loginTicket);
  
      // Extract the payload from Google Token
  
      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
      } = (await loginTicket).getPayload();
      // Find the user in the database using the googleId
      const user = await this.usersService.findOneByGoogleId(googleId);
      // If user id found generate the tokens
      if (user) {
        return this.generateTokensProvider.generateTokens(user);
      }
  
        // If not create a new user and generate the tokens
      const newUser = await this.usersService.createGoogleUser({
        email,
        googleId,
        firstName,
        lastName,
      });
  
          return this.generateTokensProvider.generateTokens(newUser); 
} catch (error) {
    

        // throw Unauthorised exception if not Authorised
  throw new UnauthorizedException(error)
}


  }
}
