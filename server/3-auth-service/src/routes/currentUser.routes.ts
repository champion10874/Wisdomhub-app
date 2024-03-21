import express, { Router } from 'express';
import { getCurrentUser, resendEmail } from '@auth/controllers/currentUser.controller';
import { refreshToken } from '@auth/controllers/refreshToken.controller';

const router: Router = express.Router();

export function currentUserRoutes(): Router {
  router.get('/current-user', getCurrentUser);
  router.get('/refresh-token/:username', refreshToken);
  router.post('/resend-email', resendEmail);

  return router;
}
