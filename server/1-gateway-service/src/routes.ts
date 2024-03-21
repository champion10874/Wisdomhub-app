import { Application } from 'express';
import { healthRoutes } from '@gateway/routes/health.routes';
import { authRoutes } from '@gateway/routes/auth.routes';

const BASE_PATH = '/api/gateway/v1';
export const appRoutes = (app: Application) => {
  app.use('', healthRoutes.routes());
  app.use(BASE_PATH, authRoutes.routes());
};
