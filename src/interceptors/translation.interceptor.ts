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
        return {
          data: instanceToPlain(data),
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: context.switchToHttp().getResponse().message,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
