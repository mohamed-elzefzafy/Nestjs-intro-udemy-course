import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccesTokenGuard } from '../acces-token.guard';
import { AuthType } from 'src/auth/enums/auth-type.enums';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constant';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.bearer;
 
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.bearer]: this.accesTokenGuard,
    [AuthType.none]: { canActivate: () => true },
  };
  constructor(
    private readonly reflector: Reflector,
    private readonly accesTokenGuard: AccesTokenGuard,
  ) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const authType = this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [AuthenticationGuard.defaultAuthType];

    // console.log(authType);

    const guards = authType.map(type => this.authTypeGuardMap[type]).flat();
    // console.log(guards);
    
    const error =  new UnauthorizedException()

for (const instance of guards) {
  // console.log(instance);
  
  const canActivate = await Promise.resolve(instance.canActivate(context)).catch((error) => {error : error});
  // console.log(canActivate);
  
  if (canActivate) {
    return true;
  }
}

throw error;
    
    return true;

  }
}