import { Global, Module } from '@nestjs/common';
import { ConfigServices } from './services/app-settings.service';

const providers = [ConfigServices];

@Global()
@Module({
  providers,
  imports: [],
  exports: [...providers],
})
export class SharedModule {}
