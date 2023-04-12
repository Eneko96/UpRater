import { Controller, Get } from '@nestjs/common';

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
}
