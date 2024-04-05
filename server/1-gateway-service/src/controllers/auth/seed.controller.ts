import { Request, Response } from 'express';
import { AxiosError, AxiosResponse } from 'axios';
import { authService } from '@gateway/services/auth-service';
import { StatusCodes } from 'http-status-codes';

export class AuthSeedController {
  public async createUsers(req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await authService.seed(req.params.count);
      res.status(StatusCodes.OK).json({ message: response.data.message });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = statusCode === StatusCodes.BAD_REQUEST ? 'Invalid credentials' : 'An error occurred.';
      res.status(statusCode).json({ error: errorMessage });
    }
  }
}
