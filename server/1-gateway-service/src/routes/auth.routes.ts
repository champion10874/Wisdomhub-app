import express, { Router } from 'express';
import { SignupController } from '@gateway/controllers/auth/signup.controller';

class AuthRoutes {
  private readonly router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/auth/signup', SignupController.prototype.create);
    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
