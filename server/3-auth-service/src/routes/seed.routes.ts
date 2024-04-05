import express, { Router } from 'express';
import { createUsers } from '@auth/controllers/seeds';


const router: Router = express.Router();

export function seedRoutes(): Router {
  router.put('/seed/:count', createUsers);

  return router;
}
