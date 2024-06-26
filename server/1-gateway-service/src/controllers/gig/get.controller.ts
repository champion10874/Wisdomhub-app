import { Request, Response } from 'express';
import { AxiosError, AxiosResponse } from 'axios';
import { gigService } from '@gateway/services/api/gig.service';
import { StatusCodes } from 'http-status-codes';


export class GetGigController {
  public gigById = async (req: Request, res: Response): Promise<void> => {
    try {
      const response: AxiosResponse = await gigService.getGigById(req.params.gigId);
      res.status(StatusCodes.OK).json({ message: response.data.message, gig: response.data.gig });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = statusCode === StatusCodes.BAD_REQUEST ? 'Invalid credentials' : 'An error occurred.';
      res.status(statusCode).json({ error: errorMessage });
    }
  };

  public getSellerGigs = async (req: Request, res: Response): Promise<void> => {
    try {
      const response: AxiosResponse = await gigService.getSellerGigs(req.params.sellerId);
      res.status(StatusCodes.OK).json({ message: response.data.message, gigs: response.data.gigs });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = statusCode === StatusCodes.BAD_REQUEST ? 'Invalid credentials' : 'An error occurred.';
      res.status(statusCode).json({ error: errorMessage });
    }
  };

  public getSellerPausedGigs = async (req: Request, res: Response): Promise<void> => {
    try {
      const response: AxiosResponse = await gigService.getSellerPausedGigs(req.params.sellerId);
      res.status(StatusCodes.OK).json({ message: response.data.message, gigs: response.data.gigs });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = statusCode === StatusCodes.BAD_REQUEST ? 'Invalid credentials' : 'An error occurred.';
      res.status(statusCode).json({ error: errorMessage });
    }
  };

  public getGigsByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const response: AxiosResponse = await gigService.getGigsByCategory(req.params.username);
      res.status(StatusCodes.OK).json({ message: response.data.message, gigs: response.data.gigs });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = statusCode === StatusCodes.BAD_REQUEST ? 'Invalid credentials' : 'An error occurred.';
      res.status(statusCode).json({ error: errorMessage });
    }
  };

  public getMoreGigsLikeThis = async (req: Request, res: Response): Promise<void> => {
    try {
      const response: AxiosResponse = await gigService.getMoreGigsLikeThis(req.params.gigId);
      res.status(StatusCodes.OK).json({ message: response.data.message, gigs: response.data.gigs });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = statusCode === StatusCodes.BAD_REQUEST ? 'Invalid credentials' : 'An error occurred.';
      res.status(statusCode).json({ error: errorMessage });
    }
  };

  public getTopRatedGigsByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const response: AxiosResponse = await gigService.getTopRatedGigsByCategory(req.params.username);
      res.status(StatusCodes.OK).json({ message: response.data.message, gigs: response.data.gigs });
    } catch (error) {
      const statusCode = (error as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = statusCode === StatusCodes.BAD_REQUEST ? 'Invalid credentials' : 'An error occurred.';
      res.status(statusCode).json({ error: errorMessage });
    }
  };
}
