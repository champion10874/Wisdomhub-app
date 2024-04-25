import { databaseConnection } from '@gig/database';
import { gigConfig } from '@gig/config';
import express, { Express } from 'express';
import { start } from '@gig/server';

const initialize = (): void => {
  gigConfig.cloudinaryConfig();
  databaseConnection();
  const app: Express = express();
  start(app);
};

initialize();
