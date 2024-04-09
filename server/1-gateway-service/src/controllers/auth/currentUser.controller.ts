import { Request, Response } from 'express';
import { authService } from '@gateway/services/api/auth.service';
import { AxiosError, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

export class CurrentUserController {
  public async read(_req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await authService.getCurrentUser();
      res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = statusCode === StatusCodes.BAD_REQUEST ? 'Invalid credentials' : 'An error occurred.';
      res.status(statusCode).json({ error: errorMessage });
    }
  }

  public async resendEmail(req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await authService.resendEmail(req.body);
      res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = statusCode === StatusCodes.BAD_REQUEST ? 'Invalid credentials' : 'An error occurred.';
      res.status(statusCode).json({ error: errorMessage });
    }
  }
}
