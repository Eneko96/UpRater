import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from '../auth/local.auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //post/ signup
  @Post('/signup')
  async addUser(
    @Body('password') userPassword: string,
    @Body('email') email: string,
  ) {
    //hash password
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);

    const result = await this.usersService.insertUser(email, hashedPassword);
    return {
      msg: 'User successfully registered',
      userId: result.id,
      userName: result.email,
    };
  }

  //Post / Login
  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  login(@Request() req): any {
    return { User: req.user, msg: 'User logged in' };
  }

  //Get / logout
  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }
}
