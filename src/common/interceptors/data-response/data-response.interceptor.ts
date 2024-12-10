import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { map, Observable, tap } from 'rxjs';
import appConfig from 'src/config/app.config';

@Injectable()
export class DataResponseInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('before intercept');

    // return next.handle().pipe(tap(data => console.log(data)));
    return next
      .handle()
      .pipe(
        map((data) => ({
          apiversion: this.configService.get('appConfig.apiVersion'),
          data: data,
        })),
      );
  }
}
