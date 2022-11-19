import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth.strategy';
import { Services } from 'src/common/constants/services';

@Module({
  imports: [UserModule, PassportModule],
  providers: [
    {
      provide: Services.AUTH,
      useClass: AuthService,
    },
    LocalStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
