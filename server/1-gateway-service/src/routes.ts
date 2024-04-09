import { Application } from 'express';
import { healthRoutes } from '@gateway/routes/health.routes';
import { authRoutes } from '@gateway/routes/auth.routes';
import { currentUsersRoutes } from '@gateway/routes/currentUsers.routes';
import { authMiddleware } from '@gateway/services/authMiddleware';
import { searchRoutes } from '@gateway/routes/search.routes';

const BASE_PATH = '/api/gateway/v1';
export const appRoutes = (app: Application) => {
  app.use('', healthRoutes.routes());
  app.use(BASE_PATH, authRoutes.routes());
  app.use(BASE_PATH, searchRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, currentUsersRoutes.routes());
};
