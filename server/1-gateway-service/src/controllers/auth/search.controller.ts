import { Request, Response } from 'express';
import { AxiosError, AxiosResponse } from 'axios';

import { StatusCodes } from 'http-status-codes';
import { authService } from '@gateway/services/auth-service';

export class SearchController {
  public async gigById(req: Request, res: Response): Promise<void> {
    try {
      const { gigId } = req.params;
      const response: AxiosResponse = await authService.getGig(gigId);
      res.status(StatusCodes.OK).json({
        message: response.data.message,
        gig: response.data.gig
      });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage =
        statusCode === StatusCodes.BAD_REQUEST ? 'Invalid credentials' : 'An error occurred.';
      res.status(statusCode).json({ error: errorMessage });
    }
  }

  public async gigs(req: Request, res: Response): Promise<void> {
    try {
      const { from, size, type } = req.params;
      let query = '';
      const objList = Object.entries(req.query);
      const lastItemIndex = objList.length - 1;
      objList.forEach(([key, value], index) => {
        query += `${key}=${value}${index !== lastItemIndex ? '&' : ''}`;
      });
      const response: AxiosResponse = await authService.getGigs(`${query}`, from, size, type);
      res.status(StatusCodes.OK).json({
        message: response.data.message,
        total: response.data.total,
        gigs: response.data.gigs
      });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage =
        statusCode === StatusCodes.BAD_REQUEST ? 'Invalid credentials' : 'An error occurred.';
      res.status(statusCode).json({ error: errorMessage });
    }
  }
}
