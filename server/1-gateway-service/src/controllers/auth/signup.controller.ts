import { Request, Response } from 'express';
import { authService } from '@gateway/services/auth-service';
import { AxiosError, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

export class SignupController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await authService.signUp(req.body);
      req.session = { jwt: response.data.token };
      res.status(StatusCodes.CREATED).json({ message: 'User created successfully', user: response.data.user });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage =
        statusCode === StatusCodes.BAD_REQUEST ? 'Invalid signup information.' : 'An error occurred during the signup process.';
      res.status(statusCode).json({ error: errorMessage });
    }
  }
}
