import { Body, Get } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller, Inject } from '@nestjs/common';
import { Routes } from 'src/common/constants/routes';
import { Services } from 'src/common/constants/services';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserService } from './interface/IUserService';

@Controller('user')
export class UserController {
  constructor(@Inject(Services.USERS) private readonly userService: IUserService) {}

  @Get(Routes.GETUSER)
  async getUser() {
    // return await this.userService.findUser({ username: 'tests' });
    return { test: 'test' };
  }

  @Post(Routes.CREATEUSER)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
}
