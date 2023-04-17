/* import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
} from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(map((data) => classToPlain(data)));
  }
}

*/

import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const ctx = context.switchToHttp();
    // const response = ctx.getResponse();
    // const request = ctx.getRequest();

    return next.handle().pipe(
      map((data: any) => {
        if (data?.toJSON) {
          return data.toJSON();
        }
        return data;
      }),
    );
  }
}
