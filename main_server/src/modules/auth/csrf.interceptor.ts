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
    const request = ctx.switchToHttp().getRequest();
    const csrfToken = request.session.csrfToken ?? '';
    const cookieCsrfToken =
      request.headers.cookie
        ?.split('; ')
        .find((row) => row.startsWith('x-csrf-token='))
        ?.split('=')[1] ?? '';
    if (!csrfToken || csrfToken !== cookieCsrfToken) {
      throw new HttpException('Invalid CSRF token', HttpStatus.FORBIDDEN);
    }
    const now = Date.now();
    return next.handle().pipe(tap(() => console.log(`${Date.now() - now}ms`)));
  }
}
