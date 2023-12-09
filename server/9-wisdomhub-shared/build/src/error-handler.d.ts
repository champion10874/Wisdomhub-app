import { StatusCodes } from 'http-status-codes';
export type TErrorResponse = {
    message: string;
    statusCode: number;
    status: string;
    sourceOfError: string;
    serializeErrors(): TError;
};
export type TError = {
    message: string;
    statusCode: number;
    status: string;
    sourceOfError: string;
};
export declare abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract status: string;
    sourceOfError: string;
    protected constructor(message: string, sourceOfError: string);
    serializeErrors(): TError;
}
export declare class BadRequestError extends CustomError {
    statusCode: StatusCodes;
    status: string;
    constructor(message: string, sourceOfError: string);
}
export declare class NotFoundError extends CustomError {
    statusCode: StatusCodes;
    status: string;
    constructor(message: string, sourceOfError: string);
}
export declare class NotAuthorizedError extends CustomError {
    statusCode: StatusCodes;
    status: string;
    constructor(message: string, sourceOfError: string);
}
export declare class FileTooLargeError extends CustomError {
    statusCode: StatusCodes;
    status: string;
    constructor(message: string, sourceOfError: string);
}
export declare class ServerError extends CustomError {
    statusCode: StatusCodes;
    status: string;
    constructor(message: string, sourceOfError: string);
}
export interface IErrorNoException extends Error {
    errorNo?: number;
    code?: string;
    path?: string;
    syscall?: string;
    stack?: string;
}
