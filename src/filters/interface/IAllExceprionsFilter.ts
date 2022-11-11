import { HttpException } from '@nestjs/common';

export interface IRequest {
  url: string;
  method: string;
  headers: any;
  user: any;
}

export interface IResponse {
  status: any;
  statusMessage: string;
}

export interface IError {
  statusCode: number;
  message: string;
}

export interface IErrorLog {
  error: TypeError | Error | object;
  timestamp: string;
  uuid: string;
}
