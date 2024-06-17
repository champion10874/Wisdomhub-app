import { Request, Response } from 'express';
import { BadRequestError, ISellerGig } from '@hassonor/wisdomhub-shared';
import { StatusCodes } from 'http-status-codes';
import { getGigById, getSellerGigs, getSellerPausedGigs } from '@gig/services/gig.service';


const gigByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const gig: ISellerGig = await getGigById(req.params.gigId);
    res.status(StatusCodes.OK).json({ message: 'Get gig by id', gig });
  } catch (error) {
    // console.error('Get a gig by id Error:', error); // move to elasticsearch later
    const errorMessage = error instanceof BadRequestError ? error.message : 'An unexpected error occurred during get a gig by id.';
    res
      .status(error instanceof BadRequestError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: errorMessage });
  }
};

const getSellerGigsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const gigs: ISellerGig[] = await getSellerGigs(req.params.sellerId);
    res.status(StatusCodes.OK).json({ message: 'Seller gigs', gigs });
  } catch (error) {
    // console.error('Get seller's gigs Error:', error); // move to elasticsearch later
    const errorMessage = error instanceof BadRequestError ? error.message : 'An unexpected error occurred during get seller"s gigs.';
    res
      .status(error instanceof BadRequestError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: errorMessage });
  }
};

const getSellerInActiveGigsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const gigs: ISellerGig[] = await getSellerPausedGigs(req.params.sellerId);
    res.status(StatusCodes.OK).json({ message: 'Seller inactive gigs', gigs });
  } catch (error) {
    // console.error('Get seller's inactive gigs Error:', error); // move to elasticsearch later
    const errorMessage = error instanceof BadRequestError ? error.message : 'An unexpected error occurred during get seller"s inactive gigs.';
    res
      .status(error instanceof BadRequestError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: errorMessage });
  }
};

export { gigByIdController, getSellerGigsController, getSellerInActiveGigsController };
