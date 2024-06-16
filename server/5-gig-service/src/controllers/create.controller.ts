import { Request, Response } from 'express';
import { UploadApiResponse } from 'cloudinary';
import { BadRequestError, ISellerGig, uploads } from '@hassonor/wisdomhub-shared';
import { StatusCodes } from 'http-status-codes';
import { gigCreateSchema } from '@gig/schemes/gig.scheme';
import { createGig } from '@gig/services/gig.service';
import { getDocumentCount } from '@gig/elasticsearch';


const gigCreateController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = await Promise.resolve(gigCreateSchema.validate(req.body));
    if (error?.details) {
      throw new BadRequestError(error.details[0].message, 'Create gig() method');
    }
    const result: UploadApiResponse = await uploads(req.body.coverImage) as UploadApiResponse;
    if (!result.public_id) {
      throw new BadRequestError('File upload error. Try again.', ' Create gig() method');
    }

    const count: number = await getDocumentCount('gigs');

    const gig: ISellerGig = {
      sellerId: req.body.sellerId,
      username: req.currentUser!.username,
      email: req.currentUser!.email,
      profilePicture: req.body.profilePicture,
      title: req.body.title,
      description: req.body.description,
      categories: req.body.categories,
      subCategories: req.body.subCategories,
      tags: req.body.tags,
      price: req.body.price,
      expectedDelivery: req.body.expectedDelivery,
      basicTitle: req.body.basicTitle,
      basicDescription: req.body.basicDescription,
      coverImage: `${result?.secure_url}`,
      sortId: count + 1
    };

    const createdGig: ISellerGig = await createGig(gig);
    res.status(StatusCodes.CREATED).json({ message: 'Gig created successfully.', gig: createdGig });
  } catch (error) {
    // console.error('Created gig Error:', error); // move to elasticsearch later
    const errorMessage = error instanceof BadRequestError ? error.message : 'An unexpected error occurred during create a new gig.';
    res
      .status(error instanceof BadRequestError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: errorMessage });
  }
};

export { gigCreateController };
