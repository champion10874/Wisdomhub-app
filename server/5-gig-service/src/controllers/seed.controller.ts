import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '@hassonor/wisdomhub-shared';
import { publishDirectMessage } from '@gig/queues/gig.producer';
import { gigChannel } from '@gig/server';


const seedCreateGigController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { count } = req.params;
    await publishDirectMessage(
      gigChannel,
      'wisdomhub-gig',
      'get-sellers',
      JSON.stringify({ type: 'getSellers', count }),
      'Gig seed message send to user service.'
    );
    res.status(StatusCodes.CREATED).json({ message: 'Gig created successfully' });
  } catch (error) {
    res
      .status(error instanceof BadRequestError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Gig failed to create.' });
  }
};

export { seedCreateGigController };
