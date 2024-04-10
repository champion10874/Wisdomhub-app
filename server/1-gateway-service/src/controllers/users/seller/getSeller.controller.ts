import { Request, Response } from 'express';
import { AxiosError, AxiosResponse } from 'axios';

import { StatusCodes } from 'http-status-codes';
import { sellerService } from '@gateway/services/api/seller.service';

export class GetSellerController {
  public async id(req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await sellerService.getSellerById(req.params.sellerId);
      res.status(StatusCodes.OK).json({ message: response.data.message, seller: response.data.seller });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage =
        statusCode === StatusCodes.BAD_REQUEST ? 'Something went wrong.' : 'An error occurred during get a seller by id.';
      res.status(statusCode).json({ error: errorMessage });
    }
  }

  public async username(req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await sellerService.getSellerByUsername(req.params.username);
      res.status(StatusCodes.OK).json({ message: response.data.message, seller: response.data.seller });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage =
        statusCode === StatusCodes.BAD_REQUEST ? 'Something went wrong.' : 'An error occurred during get a seller by username.';
      res.status(statusCode).json({ error: errorMessage });
    }
  }

  public async random(req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await sellerService.getRandomSellers(parseInt(req.params.size));
      res.status(StatusCodes.OK).json({ message: response.data.message, sellers: response.data.sellers });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage =
        statusCode === StatusCodes.BAD_REQUEST ? 'Something went wrong.' : 'An error occurred during get a random sellers.';
      res.status(statusCode).json({ error: errorMessage });
    }
  }
}
