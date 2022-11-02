import Joi from '@hapi/joi';
import { Injectable } from '@nestjs/common';
import { ConfigService, ConfigModuleOptions } from '@nestjs/config';
import { configSchema } from 'src/database/postgres.schema';
import { IConfigServices } from './interfaces/IConfigServices';

@Injectable()
export class ConfigServices implements IConfigServices {
  constructor(private configService: ConfigService) {}
  getConfigModule(): ConfigModuleOptions {
    throw new Error('Method not implemented.');
  }

  /**
   * Return an object with a port property that is a string.
   * @returns An object with a port property.
   */
  public getAppPort(): { port: string } {
    return {
      port: this.getString('PORT'),
    };
  }

  /**
   * It returns an object that tells NestJS how to load the configuration
   * @returns The return value is a ConfigModuleOptions object.
   */
  public static getConfigModule(): ConfigModuleOptions {
    return {
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: configSchema,
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
