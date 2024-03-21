import express, { Router } from 'express';
import { SignupController } from '@gateway/controllers/auth/signup.controller';
import { SigninController } from '@gateway/controllers/auth/signin.controller';
import { VerifyEmailController } from '@gateway/controllers/auth/verifyEmail.controller';
import { PasswordController } from '@gateway/controllers/auth/password.controller';
import { CurrentUserController } from '@gateway/controllers/auth/currentUser.controller';

class AuthRoutes {
  private readonly router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/auth/current-user', CurrentUserController.prototype.read);
    this.router.post('/auth/resend-email', CurrentUserController.prototype.resendEmail);
    this.router.post('/auth/signup', SignupController.prototype.create);
    this.router.post('/auth/signin', SigninController.prototype.read);
    this.router.put('/auth/verify-email', VerifyEmailController.prototype.update);
    this.router.put('/auth/forgot-password', PasswordController.prototype.forgotPassword);
    this.router.put('/auth/reset-password/:token', PasswordController.prototype.resetPassword);
    this.router.put('/auth/change-password', PasswordController.prototype.changePassword);

    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
