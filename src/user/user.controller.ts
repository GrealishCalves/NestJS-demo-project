import { Body, Get } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller, Inject } from '@nestjs/common';
import { Routs } from 'src/common/routs';
import { Services } from 'src/common/services';
import { IUserService } from './interface/IUserService';

@Controller('user')
export class UserController {
  constructor(@Inject(Services.USERS) private readonly userService: IUserService) {}

  @Get(Routs.GETUSER)
  async getUser() {
    // return await this.userService.findUser({ username: 'tests' });
    return { test: 'test' };
  }

  @Post(Routs.CREATEUSER)
  async createUser(@Body() body: any) {
    return await this.userService.createUser(body);
  }
}
