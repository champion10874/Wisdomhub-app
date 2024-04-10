import express, { Router } from 'express';
import { GetSellerController } from '@gateway/controllers/users/seller/getSeller.controller';
import { CreateSellerController } from '@gateway/controllers/users/seller/createSeller.controller';
import { UpdateSellerController } from '@gateway/controllers/users/seller/updateSeller.controller';
import { SeedSellerController } from '@gateway/controllers/users/seller/seedSeller.controller';

class SellerRoutes {
  private readonly router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/seller/id/:sellerId', GetSellerController.prototype.id);
    this.router.get('/seller/username/username', GetSellerController.prototype.username);
    this.router.get('/seller/random/:size', GetSellerController.prototype.random);
    this.router.post('/seller/create', CreateSellerController.prototype.create);
    this.router.put('/seller/:sellerId', UpdateSellerController.prototype.update);
    this.router.put('/seller/seed/:count', SeedSellerController.prototype.seed);

    return this.router;
  }
}

export const sellerRoutes: SellerRoutes = new SellerRoutes();
