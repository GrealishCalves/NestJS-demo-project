import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './auth.strategy';
import { Services } from 'src/common/constants/services';
import { SessionSerializer } from 'src/interceptors/serializer.interceptor';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    {
      provide: Services.AUTH,
      useClass: AuthService,
    },
    LocalStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
