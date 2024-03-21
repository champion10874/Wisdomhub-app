import express, { Router } from 'express';
import { CurrentUserController } from '@gateway/controllers/auth/currentUser.controller';
import { authMiddleware } from '@gateway/services/auth-middleware';

class CurrentUsersRoutes {
  private readonly router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/auth/current-user', authMiddleware.checkAuthentication, CurrentUserController.prototype.read);
    this.router.post('/auth/resend-email', authMiddleware.checkAuthentication, CurrentUserController.prototype.resendEmail);
    return this.router;
  }
}

export const currentUsersRoutes: CurrentUsersRoutes = new CurrentUsersRoutes();
