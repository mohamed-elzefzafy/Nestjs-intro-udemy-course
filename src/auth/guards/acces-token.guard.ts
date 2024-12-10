import { CanActivate, ExecutionContext, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { Request } from 'express';
import { valid } from 'joi';
import { REQUEST_USER_KEY } from '../constants/auth.constant';

@Injectable()
export class AccesTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService : JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtConfigration : ConfigType<typeof jwtConfig>
  ){}
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    const token = this.extractRequestFromeader(request);

    if (!token) {
      throw new UnauthorizedException("Invalid token")
    }
 
try {
   const payLoad =  await this.jwtService.verify(token , this.jwtConfigration );
   
   request[REQUEST_USER_KEY] = payLoad
} catch {
  throw new UnauthorizedException();
}

    return true;
  }

  private extractRequestFromeader(request : Request) : string | undefined{
  const [_ , token] = request.headers.authorization?.split(" ") ?? [];
  return token;
  }
}
