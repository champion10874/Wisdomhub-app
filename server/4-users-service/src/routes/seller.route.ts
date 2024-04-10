import express, { Router } from 'express';
import { createSellerFunc } from '@users/controllers/seller/create.controller';
import { updateSellerFunc } from '@users/controllers/seller/update.controller';
import { getById, getByUsername, getRandom } from '@users/controllers/seller/get.controller';
import { seedSeller } from '@users/controllers/seller/seed.controller';

const router: Router = express.Router();

const sellerRoutes = (): Router => {
  router.get('/id/:sellerId', getById);
  router.get('/username/:username', getByUsername);
  router.get('/random/:size', getRandom);
  router.post('/create', createSellerFunc);
  router.put('/:sellerId', updateSellerFunc);
  router.put('/seed/:count', seedSeller);

  return router;
};

export { sellerRoutes };
