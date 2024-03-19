import express, { Router } from 'express';
import { HealthControllers } from '@gateway/controllers/healthControllers';

class HealthRoutes {
  private readonly router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/gateway-health', HealthControllers.prototype.health);
    return this.router;
  }
}

export const healthRoutes: HealthRoutes = new HealthRoutes();
