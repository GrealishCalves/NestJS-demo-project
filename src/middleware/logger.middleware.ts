import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    // Log the request body and response body
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';
    const statusCode = response.statusCode;

    response.on('finish', () => {
      this.logger.log(`${method} ${originalUrl} ${statusCode} ${userAgent} ${ip}`);
    });

    this.logToFile(`${method} ${originalUrl} ${statusCode} ${userAgent} ${ip}`);
    next();
  }

  private logToFile(message: string) {
    const logStream = fs.createWriteStream('access.log', { flags: 'a' });
    logStream.write(`${message} ${new Date().toISOString()}\r\n`);
  }
}
