import { AxiosError, AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { gigService } from '@gateway/services/api/gig.service';


export class SearchGigController {
  public async gigs(req: Request, res: Response): Promise<void> {
    try {
      const { from, size, type } = req.params;
      console.log('Query before: ', req.query);
      let query = '';
      const objList = Object.entries(req.query);
      const lastItemIndex = objList.length - 1;
      objList.forEach(([key, value], index) => {
        query += `${key}=${value}${index !== lastItemIndex ? '&' : ''}`;
      });
      console.log('Query after: ', query);
      const response: AxiosResponse = await gigService.searchGigs(`${query}`, from, size, type);
      res.status(StatusCodes.OK).json({
        message: response.data.message,
        total: response.data.total,
        gigs: response.data.gigs
      });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = statusCode === StatusCodes.BAD_REQUEST ? 'Invalid credentials' : 'An error occurred.';
      res.status(statusCode).json({ error: errorMessage });
    }
  }
}
