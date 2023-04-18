import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CsrfInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const request = ctx.switchToHttp().getRequest();
    const csrfToken = request.headers['x-csrf-token'] ?? '';
    if (request.session.csrfToken !== csrfToken) {
      throw new HttpException('Invalid CSRF token', HttpStatus.FORBIDDEN);
    }
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
