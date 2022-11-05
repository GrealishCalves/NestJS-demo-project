import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { Response } from './interface/IResponse';
import * as fs from 'fs';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
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

  private writeLog(log: any) {
    const data = `${JSON.stringify(log)}\r\n`;
    fs.appendFile('Logs.log', data, 'utf8', (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}
