import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Routes } from 'src/common/constants/routes';
import { LocalAuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  @Post(Routes.LOGIN)
  @UseGuards(AuthGuard('local'), LocalAuthGuard)
  async login(@Request() req) {
    return req.user;
  }
}
