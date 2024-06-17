import { Request, Response } from 'express';
import { IPaginateProps, ISearchResult, ISellerGig } from '@hassonor/wisdomhub-shared';
import { gigsSearch } from '@gig/services/search.service';
import { sortBy } from 'lodash';
import { StatusCodes } from 'http-status-codes';

const searchGigsController = async (req: Request, res: Response) => {
  try {
    const { from, size, type } = req.params;
    let resultHits: ISellerGig[] = [];
    const paginate: IPaginateProps = { from, size: parseInt(`${size}`), type };
    const gigs: ISearchResult = await gigsSearch(
      `${req.query.query}`,
      paginate,
      `${req.query.delivery_time}`,
      parseInt(`${req.query.minPrice}`),
      parseInt(`${req.query.maxPrice}`)
    );
    for (const item of gigs.hits) {
      resultHits.push(item._source as ISellerGig);
    }
    if (type === 'backward') {
      resultHits = sortBy(resultHits, ['sortId']);
    }
    res.status(StatusCodes.OK).json({ message: 'Search gigs results', total: gigs.total, gigs: resultHits });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while processing your request.' });
  }
};

export { searchGigsController };
