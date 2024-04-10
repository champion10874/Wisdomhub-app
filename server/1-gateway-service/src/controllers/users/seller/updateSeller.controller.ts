import { Request, Response } from 'express';
import { AxiosError, AxiosResponse } from 'axios';

import { StatusCodes } from 'http-status-codes';
import { sellerService } from '@gateway/services/api/seller.service';

export class UpdateSellerController {
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await sellerService.updateSeller(req.params.sellerId, req.body);
      res.status(StatusCodes.OK).json({ message: response.data.message, seller: response.data.seller });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = statusCode === StatusCodes.BAD_REQUEST ? 'Something went wrong.' : 'An error occurred during update a seller.';
      res.status(statusCode).json({ error: errorMessage });
    }
  }
}
