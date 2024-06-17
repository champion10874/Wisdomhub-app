import { Request, Response } from 'express';
import { BadRequestError, ISearchResult, ISellerGig } from '@hassonor/wisdomhub-shared';
import { StatusCodes } from 'http-status-codes';
import { getGigById, getSellerGigs, getSellerPausedGigs } from '@gig/services/gig.service';
import { getUserSelectedGigCategory } from '@gig/redis/gig.cache';
import { getMoreGigsLikeThis, getTopRatedGigsByCategory, gigsSearchByCategory } from '@gig/services/search.service';


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

const topRatedGigsByCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await getUserSelectedGigCategory(`selectedCategories:${req.params.username}`);
    const resultHits: ISellerGig[] = [];
    const gigs: ISearchResult = await getTopRatedGigsByCategory(`${category}`);
    for (const item of gigs.hits) {
      resultHits.push(item._source as ISellerGig);
    }
    res.status(StatusCodes.OK).json({ message: 'Search top gigs results', total: gigs.total, gigs: resultHits });
  } catch (error) {
    // console.error('topRatedGigsByCategoryController Error:', error); // move to elasticsearch later
    const errorMessage = error instanceof BadRequestError ? error.message : 'An unexpected error occurred during get topRatedGigsByCategory.';
    res
      .status(error instanceof BadRequestError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: errorMessage });
  }
};

const gigsByCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await getUserSelectedGigCategory(`selectedCategories:${req.params.username}`);
    const resultHits: ISellerGig[] = [];
    const gigs: ISearchResult = await gigsSearchByCategory(`${category}`);
    for (const item of gigs.hits) {
      resultHits.push(item._source as ISellerGig);
    }
    res.status(StatusCodes.OK).json({ message: 'Search gigs category results', total: gigs.total, gigs: resultHits });
  } catch (error) {
    // console.error('gigsByCategoryController Error:', error); // move to elasticsearch later
    const errorMessage = error instanceof BadRequestError ? error.message : 'An unexpected error occurred during get gigsByCategory.';
    res
      .status(error instanceof BadRequestError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: errorMessage });
  }
};

const moreLikeThisController = async (req: Request, res: Response): Promise<void> => {
  try {
    const resultHits: ISellerGig[] = [];
    const gigs: ISearchResult = await getMoreGigsLikeThis(req.params.gigId);
    for (const item of gigs.hits) {
      resultHits.push(item._source as ISellerGig);
    }
    res.status(StatusCodes.OK).json({ message: 'More gigs like this result', total: gigs.total, gigs: resultHits });
  } catch (error) {
    // console.error('moreLikeThisController Error:', error); // move to elasticsearch later
    const errorMessage = error instanceof BadRequestError ? error.message : 'An unexpected error occurred during get moreLikeThis.';
    res
      .status(error instanceof BadRequestError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: errorMessage });
  }
};

export {
  gigByIdController,
  getSellerGigsController,
  getSellerInActiveGigsController,
  topRatedGigsByCategoryController,
  gigsByCategoryController,
  moreLikeThisController
};
