import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { ConfigServices } from './shared/services/app-settings.service';

@Module({
  imports: [SharedModule, ConfigModule.forRoot(ConfigServices.getConfigModule())],
  controllers: [],
  providers: [],
})
export class AppModule {}
