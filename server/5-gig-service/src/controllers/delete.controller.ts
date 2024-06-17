import { Request, Response } from 'express';
import { BadRequestError } from '@hassonor/wisdomhub-shared';
import { StatusCodes } from 'http-status-codes';

import { deleteGig } from '@gig/services/gig.service';

const gigDeleteController = async (req: Request, res: Response): Promise<void> => {
  try {
    await deleteGig(req.params.gigId, req.params.sellerId);
    res.status(StatusCodes.OK).json({ message: 'Gig deleted successfully.' });
  } catch (error) {
    // console.error('Delete gig Error:', error); // move to elasticsearch later
    const errorMessage = error instanceof BadRequestError ? error.message : 'An unexpected error occurred during delete a gig.';
    res
      .status(error instanceof BadRequestError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: errorMessage });
  }
};

export { gigDeleteController };
