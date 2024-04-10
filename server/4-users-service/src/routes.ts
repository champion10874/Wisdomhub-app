import { Application } from 'express';
import { verifyGatewayRequest } from '@hassonor/wisdomhub-shared';
import { buyerRoutes } from '@users/routes/buyer.route';
import { healthRoutes } from '@users/routes/health.route';
import { sellerRoutes } from '@users/routes/seller.route';

const BUYER_BASE_PATH = '/api/v1/buyer';
const SELLER_BASE_PATH = '/api/v1/seller';

const appRoutes = (app: Application): void => {
  app.use('', healthRoutes());
  app.use(BUYER_BASE_PATH, verifyGatewayRequest, buyerRoutes());
  app.use(SELLER_BASE_PATH, verifyGatewayRequest, sellerRoutes());
};

export { appRoutes };
