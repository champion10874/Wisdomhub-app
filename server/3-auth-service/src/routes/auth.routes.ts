import express, { Router } from 'express';
import { create } from '@auth/controllers/signup.controller';

const router: Router = express.Router();

export function authRoutes(): Router {
  router.post('/signup', create);

  return router;
}
