import { AxiosError, AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { gigService } from '@gateway/services/api/gig.service';


export class CreateGigController {
  public gig = async (req: Request, res: Response): Promise<void> => {
    try {
      const response: AxiosResponse = await gigService.createGig(req.body);
      res.status(StatusCodes.CREATED).json({ message: response.data.message, gig: response.data.gig });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = statusCode === StatusCodes.BAD_REQUEST ? 'Invalid credentials' : 'An error occurred.';
      res.status(statusCode).json({ error: errorMessage });
    }
  };
}
