import { Application } from 'express';

import { healthRoutes } from '@gig/routes/health.route';
import { verifyGatewayRequest } from '@hassonor/wisdomhub-shared';


const BASE_PATH = '/api/v1/gig';


const appRoutes = (app: Application): void => {
  app.use('', healthRoutes());
  app.use(BASE_PATH, verifyGatewayRequest, () => console.log('gig routes'));
  app.use(BASE_PATH, verifyGatewayRequest, () => console.log('search routes'));
};

export { appRoutes };