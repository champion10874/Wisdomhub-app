import express, { Router } from 'express';
import { CurrentUserController } from '@gateway/controllers/auth/currentUser.controller';
import { authMiddleware } from '@gateway/services/authMiddleware';
import { RefreshTokenController } from '@gateway/controllers/auth/refreshToken.controller';

class CurrentUsersRoutes {
  private readonly router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/auth/current-user', authMiddleware.checkAuthentication, CurrentUserController.prototype.read);
    this.router.get('/auth/refresh-token', authMiddleware.checkAuthentication, RefreshTokenController.prototype.refreshToken);
    this.router.post('/auth/resend-email', authMiddleware.checkAuthentication, CurrentUserController.prototype.resendEmail);
    return this.router;
  }
}

export const currentUsersRoutes: CurrentUsersRoutes = new CurrentUsersRoutes();
