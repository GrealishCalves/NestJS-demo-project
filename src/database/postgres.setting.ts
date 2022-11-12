import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  /**
   * It returns an object that contains the Postgres configuration
   * @returns The TypeOrmModuleOptions object.
   */
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...this.postgresConfig,
    };
  }

  /**
   * It returns a TypeOrmModuleOptions object that contains the database connection information
   * @returns The postgresConfig is being returned.
   */
  get postgresConfig(): TypeOrmModuleOptions {
    return {
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      host: this.getString('DB_HOST'),
      port: this.getNumber('DB_PORT'),
      username: this.getString('DB_USERNAME'),
      password: this.getString('DB_PASSWORD'),
      database: this.getString('DB_DATABASE'),
    };
  }

  private getNumber(key: string): number {
    const value = this.configService.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  private getString(key: string): string {
    const value = this.configService.get(key);
    return value;
  }
}
