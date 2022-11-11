import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { ConfigServices } from './shared/services/app-settings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './database/postgres.setting';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot(ConfigServices.getConfigModule()),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    UserModule,
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
