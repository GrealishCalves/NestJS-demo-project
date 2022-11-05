import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { Response } from './interface/IResponse';
import * as fs from 'fs';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  /**
   * It intercepts the response from the controller and transforms it into a plain object
   * @param {ExecutionContext} context - ExecutionContext - The context of the request.
   * @param {CallHandler} next - CallHandler - The next interceptor in the chain.
   * @returns The response object is being returned.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        this.logger(context);

        return {
          data: instanceToPlain(data),
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: context.switchToHttp().getResponse().message,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }

  /**
   * It takes the request and response objects from the context, and then creates a log object with the
   * request and response data
   * @param {ExecutionContext} context - ExecutionContext - The context of the request.
   */
  private logger(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url } = request;
    const { statusCode } = response;

    const log = {
      method,
      url,
      statusCode,
      timestamp: new Date().toISOString(),
      request: {
        body: request.body,
        params: request.params,
        query: request.query,
      },
      //   response: {
      //     body: response.body,
      //     params: response.params,
      //     query: response.query,
      //   },
    };

    this.writeLog(log);
  }

  /**
   * It takes a log object, converts it to a string, and appends it to a file
   * @param {any} log - The log object that you want to write to the log file.
   */
  private writeLog(log: any) {
    const data = `${JSON.stringify(log)}\r\n`;
    fs.appendFile('Logs.log', data, 'utf8', (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}
