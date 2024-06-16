import express, { Router } from 'express';
import { gigCreateController } from '@gig/controllers/create.controller';
import { gigUpdateActiveController, gigUpdateController } from '@gig/controllers/update.controller';
import { gigDeleteController } from '@gig/controllers/delete.controller';


const router: Router = express.Router();

const gigRoutes = (): Router => {
  router.post('/create', gigCreateController);
  router.put('/:gigId', gigUpdateController);
  router.put('/active/:gigId', gigUpdateActiveController);
  router.delete('/:gigId/:sellerId', gigDeleteController);

  return router;
};

export { gigRoutes };
