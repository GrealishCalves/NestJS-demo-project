import { ConfigModuleOptions } from '@nestjs/config';

export interface IConfigServices {
  getAppPort(): { port: string };
  getConfigModule(): ConfigModuleOptions;
}
