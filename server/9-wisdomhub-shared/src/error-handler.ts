import { StatusCodes } from 'http-status-codes';


export type TErrorResponse = {
  message: string;
  statusCode: number;
  status: string;
  sourceOfError: string;
  serializeErrors(): TError;
}

export type TError = {
  message: string;
  statusCode: number;
  status: string;
  sourceOfError: string;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;
  sourceOfError: string;

  protected constructor(message: string, sourceOfError: string) {
    super(message);
    this.sourceOfError = sourceOfError;
  }

  serializeErrors(): TError {
    return {
      sourceOfError: this.sourceOfError,
      status: this.status,
      statusCode: this.statusCode,
      message: this.message

    }
  }
}

export class BadRequestError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;
  status = 'error';

  constructor(message: string, sourceOfError: string) {
    super(message, sourceOfError);
  }
}

export class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;
  status = 'error';

  constructor(message: string, sourceOfError: string) {
    super(message, sourceOfError);
  }
}

export class NotAuthorizedError extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;
  status = 'error';

  constructor(message: string, sourceOfError: string) {
    super(message, sourceOfError);
  }
}

export class FileTooLargeError extends CustomError {
  statusCode = StatusCodes.REQUEST_TOO_LONG;
  status = 'error';

  constructor(message: string, sourceOfError: string) {
    super(message, sourceOfError);
  }
}

export class ServerError extends CustomError {
  statusCode = StatusCodes.SERVICE_UNAVAILABLE;
  status = 'error';

  constructor(message: string, sourceOfError: string) {
    super(message, sourceOfError);
  }
}

export interface IErrorNoException extends Error {
  errorNo?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}
