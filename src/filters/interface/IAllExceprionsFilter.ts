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
  status?: string;
  timestamp: string;
  message: string;
}
