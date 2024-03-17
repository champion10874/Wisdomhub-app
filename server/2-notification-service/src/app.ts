import { Logger } from 'winston';
import { winstonLogger } from '@hassonor/wisdomhub-shared';
import { notificationConfig } from '@notifications/config';
import express, { Express } from 'express';
import { start } from '@notifications/server';


const log: Logger = winstonLogger(`${notificationConfig.ELASTIC_SEARCH_URL}`, 'notificationApp', 'debug');

function initialize(): void {
  const app: Express = express();
  start(app);
  log.info('Notification Service Initialized');
}

initialize();
