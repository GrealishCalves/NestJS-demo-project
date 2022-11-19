import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { ConfigServices } from './shared/services/app-settings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './database/postgres.setting';
import { UserModule } from './modules/user/user.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    SharedModule,
    UserModule,
    AuthModule,
    PassportModule.register({ session: true }),
    ConfigModule.forRoot(ConfigServices.getConfigModule()),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
  ],
  controllers: [],
  providers: [],
})

// export Logger LoggerMiddleware
export class AppModule {
  configure(consumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
