import { Application } from 'express';
import { healthRoutes } from '@gateway/routes/healthRoutes';

export const appRoutes = (app: Application) => {
  app.use('', healthRoutes.routes());
};
