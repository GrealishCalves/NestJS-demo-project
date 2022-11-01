import { Injectable } from '@nestjs/common';
import { ConfigService, ConfigModuleOptions } from '@nestjs/config';
import { IConfigServices } from './interfaces/IConfigServices';

@Injectable()
export class ConfigServices implements IConfigServices {
  constructor(private configService: ConfigService) {}
  getConfigModule(): ConfigModuleOptions {
    throw new Error('Method not implemented.');
  }

  public getAppPort(): { port: string } {
    return {
      port: this.getString('PORT'),
    };
  }

  public static getConfigModule(): ConfigModuleOptions {
    return {
      envFilePath: '.env',
      isGlobal: true,
    };
  }

  private getString(key: string): string {
    const value = this.configService.get(key);
    return value;
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);
    if (!value) {
      throw new Error(`Config error - missing env.${key}`);
    }
    return value;
  }
}
