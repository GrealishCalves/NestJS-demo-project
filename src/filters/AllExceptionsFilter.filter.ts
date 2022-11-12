import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { IError, IErrorLog } from './interface/IAllExceprionsFilter';
import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import * as fs from 'fs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  /**
   * If the exception is an instance of HttpException, then we get the status code from the exception,
   * otherwise we set the status code to 500
   * @param {HttpException} exception - The exception that was thrown.
   * @param {ArgumentsHost} host - ArgumentsHost - This is the host of the arguments.
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      response.status(status).json({
        error: this.getInternalServerError(),
        timestamp: new Date().toISOString(),
        uuid: randomUUID(),
      });
    } else {
      response.status(status).json({
        error: this.getResponseError(exception),
        timestamp: new Date().toISOString(),
        uuid: randomUUID(),
      });
    }

    console.log('Error', exception.message);
  }

  /*** It takes an exception, gets the response, writes a log, and returns the response
   * @param {HttpException} exception - The exception that was thrown.
   * @returns The error object is being returned.
   */
  private getResponseError(exception: HttpException): IError {
    const error: any = exception.getResponse();
    const log: IErrorLog = {
      error,
      timestamp: new Date().toISOString(),
      uuid: randomUUID(),
    };
    this.writeLog(log);

    return error;
  }

  /**
   * It returns an error object with a status code of 500 and a message of 'Internal Server Error'
   * @returns An object with a statusCode and message.
   */
  private getInternalServerError(): IError {
    const error = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    };

    const log: IErrorLog = {
      error,
      timestamp: new Date().toISOString(),
      uuid: randomUUID(),
    };
    this.writeLog(log);

    return error;
  }

  /**
   * It takes a log object, converts it to a string, and appends it to a file called Errors.log
   * @param {IErrorLog} log - The log object that you want to write to the log file.
   */
  private writeLog(log: IErrorLog): void {
    const data = `${JSON.stringify(log)}\r\n`;
    fs.appendFile('Errors.log', data, 'utf8', (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}
