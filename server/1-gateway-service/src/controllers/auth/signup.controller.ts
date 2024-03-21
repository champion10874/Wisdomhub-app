import { Request, Response } from 'express';
import { authService } from '@gateway/services/auth-service';
import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

export class SignupController {
  public async create(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.signUp(req.body);
    req.session = { jwt: response.data.token };
    res.status(StatusCodes.CREATED).json({ message: response.data.message, user: response.data.user });
  }
}
