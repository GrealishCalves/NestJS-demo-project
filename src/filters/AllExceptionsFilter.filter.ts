import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { IError } from './interface/IAllExceprionsFilter';
import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import * as fs from 'fs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      error: this.getResponseLogger(exception),
      timestamp: new Date().toISOString(),
      uuid: randomUUID(),
    });
  }

  private getResponseLogger(exception: HttpException): IError {
    const error: IError = exception.getResponse() as IError;

    const log = {
      error,
      timestamp: new Date().toISOString(),
      uuid: randomUUID(),
    };
    this.writeLog(log);

    return error;
  }

  private writeLog(log: any): void {
    const data = `${JSON.stringify(log)}\r\n`;
    fs.appendFile('Errors.log', data, 'utf8', (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}
