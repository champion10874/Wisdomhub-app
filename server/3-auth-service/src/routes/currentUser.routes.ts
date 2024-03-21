import express, { Router } from 'express';
import { getCurrentUser, resendEmail } from '@auth/controllers/currentUser.controller';

const router: Router = express.Router();

export function currentUserRoutes(): Router {
  router.get('/current-user', getCurrentUser);
  router.post('/resend-email', resendEmail);

  return router;
}
