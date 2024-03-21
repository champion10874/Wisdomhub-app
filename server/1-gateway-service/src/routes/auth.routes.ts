import express, { Router } from 'express';
import { SignupController } from '@gateway/controllers/auth/signup.controller';
import { SigninController } from '@gateway/controllers/auth/signin.controller';
import { VerifyEmailController } from '@gateway/controllers/auth/verifyEmail.controller';

class AuthRoutes {
  private readonly router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/auth/signup', SignupController.prototype.create);
    this.router.post('/auth/signin', SigninController.prototype.read);
    this.router.put('/auth/verify-email', VerifyEmailController.prototype.update);
    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
