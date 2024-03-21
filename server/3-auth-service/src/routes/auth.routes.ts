import express, { Router } from 'express';
import { create } from '@auth/controllers/signup.controller';
import { read } from '@auth/controllers/signin.controller';
import { update } from '@auth/controllers/verifyEmail.controller';

const router: Router = express.Router();

export function authRoutes(): Router {
  router.post('/signup', create);
  router.post('/signin', read);
  router.put('/verify-email', update);
  return router;
}
