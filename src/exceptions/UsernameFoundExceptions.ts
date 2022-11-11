import { HttpException, HttpStatus } from '@nestjs/common';

export class UserFoundException extends HttpException {
  constructor() {
    super('username already taken', HttpStatus.CONFLICT);
  }

  getResponse() {
    return {
      statusCode: this.getStatus(),
      message: this.message,
    };
  }
}
