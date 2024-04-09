import { Request, Response } from 'express';
import { AxiosError, AxiosResponse } from 'axios';
import { authService } from '@gateway/services/api/auth.service';
import { StatusCodes } from 'http-status-codes';

export class RefreshTokenController {
  public async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await authService.getRefreshToken(req.currentUser!.username);
      res.status(StatusCodes.OK).json({
        message: response.data.message,
        user: response.data.user,
        token: response.data.token
      });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = statusCode === StatusCodes.BAD_REQUEST ? 'Invalid credentials' : 'An error occurred.';
      res.status(statusCode).json({ error: errorMessage });
    }
  }
}
