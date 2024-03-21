import { Application } from 'express';
import { healthRoutes } from '@gateway/routes/health.routes';

export const appRoutes = (app: Application) => {
  app.use('', healthRoutes.routes());
};
