import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '@hassonor/wisdomhub-shared';

const healthController = (_req: Request, res: Response): void => {
  try {
    res.status(StatusCodes.OK).send('Gig service is healthy and OK.');
  } catch (error) {
    res
      .status(error instanceof BadRequestError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Gig service not healthy.' });
  }
};

export { healthController };
