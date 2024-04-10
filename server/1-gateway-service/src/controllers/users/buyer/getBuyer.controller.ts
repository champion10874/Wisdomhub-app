import { Request, Response } from 'express';
import { AxiosError, AxiosResponse } from 'axios';

import { StatusCodes } from 'http-status-codes';
import { buyerService } from '@gateway/services/api/buyer.service';

export class GetBuyerController {
  public async email(_req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await buyerService.getBuyerByEmail();
      res.status(StatusCodes.OK).json({ message: response.data.message, buyer: response.data.user });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage =
        statusCode === StatusCodes.BAD_REQUEST ? 'Something went wrong.' : 'An error occurred during the forgot password process.';
      res.status(statusCode).json({ error: errorMessage });
    }
  }

  public async currentUsername(_req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await buyerService.getCurrentBuyerByUsername();
      res.status(StatusCodes.OK).json({ message: response.data.message, buyer: response.data.user });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage =
        statusCode === StatusCodes.BAD_REQUEST ? 'Something went wrong.' : 'An error occurred during the forgot password process.';
      res.status(statusCode).json({ error: errorMessage });
    }
  }

  public async username(req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await buyerService.getBuyerByUsername(req.params.username);
      res.status(StatusCodes.OK).json({ message: response.data.message, buyer: response.data.user });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage =
        statusCode === StatusCodes.BAD_REQUEST ? 'Something went wrong.' : 'An error occurred during the forgot password process.';
      res.status(statusCode).json({ error: errorMessage });
    }
  }
}
