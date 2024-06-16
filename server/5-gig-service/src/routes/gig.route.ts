import express, { Router } from 'express';
import { createGigController } from '@gig/controllers/create.controller';


const router: Router = express.Router();

const gigRoutes = (): Router => {
  router.post('/create', createGigController);

  return router;
};

export { gigRoutes };
