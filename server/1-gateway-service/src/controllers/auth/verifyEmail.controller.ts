import { Request, Response } from 'express';
import { authService } from '@gateway/services/api/auth.service';
import { AxiosError, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

export class VerifyEmailController {
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await authService.verifyEmail(req.body.token);
      res.status(StatusCodes.OK).json({ message: 'Email Verified successfully', user: response.data.user });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage =
        statusCode === StatusCodes.BAD_REQUEST ? 'Something went wrong.' : 'An error occurred during the email verification process.';
      res.status(statusCode).json({ error: errorMessage });
    }
  }
}
