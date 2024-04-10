import { Request, Response } from 'express';
import { IBuyerDocument } from '@hassonor/wisdomhub-shared';
import { getBuyerByEmail, getBuyerByUsername } from '@users/services/buyer.service';
import { StatusCodes } from 'http-status-codes';

const buyerByEmail = async (req: Request, res: Response): Promise<void> => {
  const buyer: IBuyerDocument | null = await getBuyerByEmail(req.currentUser!.email);
  res.status(StatusCodes.OK).json({ message: 'Buyer profile', buyer });
};

const buyerByCurrentUsername = async (req: Request, res: Response): Promise<void> => {
  const buyer: IBuyerDocument | null = await getBuyerByUsername(req.currentUser!.username);
  res.status(StatusCodes.OK).json({ message: 'Buyer profile', buyer });
};

const buyerByUsername = async (req: Request, res: Response): Promise<void> => {
  const buyer: IBuyerDocument | null = await getBuyerByUsername(req.params.username);
  res.status(StatusCodes.OK).json({ message: 'Buyer profile', buyer });
};

export { buyerByEmail, buyerByCurrentUsername, buyerByUsername };
