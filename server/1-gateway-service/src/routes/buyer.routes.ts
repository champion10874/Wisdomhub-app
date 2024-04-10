import express, { Router } from 'express';
import { GetBuyerController } from '@gateway/controllers/users/buyer/getBuyer.controller';

class BuyerRoutes {
  private readonly router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/buyer/email', GetBuyerController.prototype.email);
    this.router.get('/buyer/username', GetBuyerController.prototype.currentUsername);
    this.router.get('/buyer/:username', GetBuyerController.prototype.username);

    return this.router;
  }
}

export const buyerRoutes: BuyerRoutes = new BuyerRoutes();
