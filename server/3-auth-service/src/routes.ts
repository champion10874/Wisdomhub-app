import { Application } from 'express';
import { authRoutes } from '@auth/routes/auth.routes';
import { verifyGatewayRequest } from '@hassonor/wisdomhub-shared';

const BASE_AUTH_PATH = '/api/v1/auth';

export function appRoutes(app: Application) {
  app.use(BASE_AUTH_PATH, verifyGatewayRequest, authRoutes());
}
