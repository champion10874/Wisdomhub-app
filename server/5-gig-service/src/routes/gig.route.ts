import express, { Router } from 'express';
import { gigCreateController } from '@gig/controllers/create.controller';
import { gigUpdateActiveController, gigUpdateController } from '@gig/controllers/update.controller';
import { gigDeleteController } from '@gig/controllers/delete.controller';
import {
  getSellerGigsController,
  getSellerInActiveGigsController,
  gigByIdController, gigsByCategoryController, moreLikeThisController, topRatedGigsByCategoryController
} from '@gig/controllers/get.controller';
import { searchGigsController } from '@gig/controllers/search.controller';


const router: Router = express.Router();

const gigRoutes = (): Router => {
  router.get('/:gigId', gigByIdController);
  router.get('/seller/:sellerId', getSellerGigsController);
  router.get('/seller/pause/:sellerId', getSellerInActiveGigsController);
  router.get('/search/:from/:size/:type', searchGigsController);
  router.get('/category/:username', gigsByCategoryController);
  router.get('/top/:username', topRatedGigsByCategoryController);
  router.get('/similar/:gigId', moreLikeThisController);

  router.post('/create', gigCreateController);
  router.put('/:gigId', gigUpdateController);
  router.put('/active/:gigId', gigUpdateActiveController);
  router.delete('/:gigId/:sellerId', gigDeleteController);

  return router;
};

export { gigRoutes };
