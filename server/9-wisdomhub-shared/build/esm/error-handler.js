import { StatusCodes } from 'http-status-codes';
export class CustomError extends Error {
  constructor(message, sourceOfError) {
    super(message);
    this.statusCode = void 0;
    this.status = void 0;
    this.sourceOfError = void 0;
    this.sourceOfError = sourceOfError;
  }
  serializeErrors() {
    return {
      sourceOfError: this.sourceOfError,
      status: this.status,
      statusCode: this.statusCode,
      message: this.message
    };
  }
}
export class BadRequestError extends CustomError {
  constructor(message, sourceOfError) {
    super(message, sourceOfError);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.status = 'error';
  }
}
export class NotFoundError extends CustomError {
  constructor(message, sourceOfError) {
    super(message, sourceOfError);
    this.statusCode = StatusCodes.NOT_FOUND;
    this.status = 'error';
  }
}
export class NotAuthorizedError extends CustomError {
  constructor(message, sourceOfError) {
    super(message, sourceOfError);
    this.statusCode = StatusCodes.UNAUTHORIZED;
    this.status = 'error';
  }
}
export class FileTooLargeError extends CustomError {
  constructor(message, sourceOfError) {
    super(message, sourceOfError);
    this.statusCode = StatusCodes.REQUEST_TOO_LONG;
    this.status = 'error';
  }
}
export class ServerError extends CustomError {
  constructor(message, sourceOfError) {
    super(message, sourceOfError);
    this.statusCode = StatusCodes.SERVICE_UNAVAILABLE;
    this.status = 'error';
  }
}
//# sourceMappingURL=error-handler.js.map