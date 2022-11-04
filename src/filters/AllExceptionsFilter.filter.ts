import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { IError } from './interface/IAllExceprionsFilter';
import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import * as fs from 'fs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  /**
   * It takes an exception and an arguments host, and then it returns a JSON response with the error
   * message, a timestamp, and a UUID
   * @param {HttpException} exception - The exception that was thrown.
   * @param {ArgumentsHost} host - ArgumentsHost: This is the host of the arguments.
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      error: this.getResponseError(exception),
      timestamp: new Date().toISOString(),
      uuid: randomUUID(),
    });
  }

  /**
   * It takes an exception, gets the response, writes a log, and returns the response
   * @param {HttpException} exception - The exception that was thrown.
   * @returns The error object is being returned.
   */
  private getResponseError(exception: HttpException): IError {
    const error: IError = exception.getResponse() as IError;

    const log = {
      error,
      timestamp: new Date().toISOString(),
      uuid: randomUUID(),
    };
    this.writeLog(log);

    return error;
  }

  /**
   * It takes a log object, converts it to a string, and appends it to a file called Errors.log
   * @param {any} log - The log object that you want to write to the log file.
   */
  private writeLog(log: any): void {
    const data = `${JSON.stringify(log)}\r\n`;
    fs.appendFile('Errors.log', data, 'utf8', (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}
