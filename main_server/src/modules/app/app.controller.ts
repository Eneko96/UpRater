import {
  Controller,
  Get,
  Req,
  Res,
  Session,
  Request,
  UseGuards,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
const MINUTES_10 = 600000;

@Controller('/')
@UseGuards(AuthenticatedGuard)
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
    res.cookie('x-csrf-token', csrfToken, {
      httpOnly: false,
      expires: new Date(Date.now() + MINUTES_10),
    });
    return res.json({ csrfToken });
  }

  @Get('/ping')
  getPing(): any {
    return 'pong';
  }
}
