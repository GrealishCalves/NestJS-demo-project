import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { ConfigServices } from './shared/services/app-settings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './database/postgres.setting';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot(ConfigServices.getConfigModule()),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
