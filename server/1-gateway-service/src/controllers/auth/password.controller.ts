import { Request, Response } from 'express';
import { authService } from '@gateway/services/api/auth.service';
import { AxiosError, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

export class PasswordController {
  public async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await authService.forgotPassword(req.body.email);
      res.status(StatusCodes.OK).json({ message: response.data.user });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage =
        statusCode === StatusCodes.BAD_REQUEST ? 'Something went wrong.' : 'An error occurred during the forgot password process.';
      res.status(statusCode).json({ error: errorMessage });
    }
  }

  public async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.params;
      const response: AxiosResponse = await authService.resetPassword(token, req.body.password, req.body.confirmPassword);
      res.status(StatusCodes.OK).json({ message: response.data.user });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage =
        statusCode === StatusCodes.BAD_REQUEST ? 'Something went wrong.' : 'An error occurred during the reset password process.';
      res.status(statusCode).json({ error: errorMessage });
    }
  }

  public async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await authService.changePassword(req.body.currentPassword, req.body.newPassword);
      res.status(StatusCodes.OK).json({ message: response.data.user });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage =
        statusCode === StatusCodes.BAD_REQUEST ? 'Something went wrong.' : 'An error occurred during the reset password process.';
      res.status(statusCode).json({ error: errorMessage });
    }
  }
}
