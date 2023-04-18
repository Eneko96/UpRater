import { Controller, Get, Req, Res, Session, Request } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Controller('/')
export class AppController {
  @Get()
  getHello(): any {
    return {
      rates: '/rate',
      rate: '/rate/:id',
      profile: '/profile',
      comment: '/comment',
    };
  }

  @Get('/secoptions')
  getSecOptions(
    @Req() req: Request,
    @Res() res: any,
    @Session() session: Record<string, any>,
  ): any {
    const csrfToken = randomBytes(16).toString('hex');
    session.csrfToken = csrfToken;
    return res.json({ csrfToken });
  }
}
