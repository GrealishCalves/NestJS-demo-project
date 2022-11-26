import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Routes } from 'src/common/constants/routes';
import { AuthenticatedGuard, LocalAuthGuard } from './guards/LocalStrategy.guard';

@Controller('auth')
export class AuthController {
  @Post(Routes.LOGIN)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  async testProtection(@Request() req) {
    return req.user;
  }
}
