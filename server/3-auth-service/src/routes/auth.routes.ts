import express, { Router } from 'express';
import { createNewUser } from '@auth/controllers/signup.controller';
import { login } from '@auth/controllers/signin.controller';
import { verifyEmail } from '@auth/controllers/verifyEmail.controller';
import { changePassword, forgotPassword, resetPassword } from '@auth/controllers/password.controller';

const router: Router = express.Router();

export function authRoutes(): Router {
  router.post('/signup', createNewUser);
  router.post('/signin', login);
  router.put('/verify-email', verifyEmail);
  router.put('/forgot-password', forgotPassword);
  router.put('/reset-password/:token', resetPassword);
  router.put('/change-password', changePassword);
  return router;
}
