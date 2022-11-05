export interface Response<T> {
  statusCode: number;
  message: string;
  data: Record<string, any>;
}
