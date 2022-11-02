import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { IError, IRequest, IResponse } from './interface/IAllExceprionsFilter';
import * as fs from 'fs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<IResponse>();
    const request = ctx.getRequest<IRequest>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';

    response.status(status).json({
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
      message: message,
    });

    console.log(this.getResponseLogger(exception));
    const errorLog = this.getResponseLogger(exception);
    this.writeErrorLogToFile(errorLog);
  }

  private getResponseLogger(exception: any): Error | any {
    let errorLog: IError | object;

    if (exception instanceof HttpException) {
      errorLog = {
        message: exception.getResponse(),
        timestamp: new Date().toISOString(),
      };
      return errorLog;
    } else {
      errorLog = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
      return errorLog;
    }
  }

  private writeErrorLogToFile = (errorLog: IError): void => {
    const data = `${JSON.stringify(errorLog)}\r\n`;
    fs.appendFile('error.log', data, 'utf8', (err) => {
      if (err) throw err;
    });
  };
}
