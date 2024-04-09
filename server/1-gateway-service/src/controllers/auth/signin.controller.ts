import { Request, Response } from 'express';
import { authService } from '@gateway/services/api/auth.service';
import { AxiosError, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

export class SigninController {
  public async read(req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await authService.signIn(req.body);
      req.session = { jwt: response.data.token };
      res.status(StatusCodes.OK).json({ message: 'User login successfully', user: response.data.user });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage =
        statusCode === StatusCodes.BAD_REQUEST ? 'Invalid signin information.' : 'An error occurred during the signin process.';
      res.status(statusCode).json({ error: errorMessage });
    }
  }
}
