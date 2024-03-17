import http from 'http';
import 'express-async-errors';
import { winstonLogger } from '@hassonor/wisdomhub-shared';
import { Logger } from 'winston';
import { notificationConfig } from '@notifications/config';
import { Application } from 'express';
import * as process from 'process';
import { healthRoutes } from '@notifications/routes';
import { checkElasticSearchConnection } from '@notifications/elasticsearch';
import { createRabbitMQConnection } from '@notifications/queues/connection';
import { Channel } from 'amqplib';
import { consumeAuthEmailMessages, consumeOrderEmailMessages } from '@notifications/queues/email.consumer';

const SERVER_PORT = 4001;
const log: Logger = winstonLogger(`${notificationConfig.ELASTIC_SEARCH_URL}`, 'notificationServer', 'debug');

export function start(app: Application): void {
  startServer(app);
  app.use('', healthRoutes);
  startQueues();
  startElasticSearch();
}

async function startQueues(): Promise<void> {
  const emailChannel: Channel = await createRabbitMQConnection() as Channel;
  await consumeAuthEmailMessages(emailChannel);
  await consumeOrderEmailMessages(emailChannel);
  await emailChannel.assertExchange('jobber-email-notification', 'direct');
  const message1 = JSON.stringify({ name: 'jobber', service: 'notification auth service' });
  emailChannel.publish('jobber-email-notification', 'auth-email', Buffer.from(message1));

  await emailChannel.assertExchange('jobber-order-notification', 'direct');
  const message2 = JSON.stringify({ name: 'jobber', service: 'notification order service' });
  emailChannel.publish('jobber-order-notification', 'order-email', Buffer.from(message2));
}

function startElasticSearch(): void {
  checkElasticSearchConnection();
}

function startServer(app: Application): void {
  try {
    const httpServer: http.Server = new http.Server(app);
    log.info(`Worker with process id of ${process.pid} on notification server has started`);
    httpServer.listen(SERVER_PORT, () => {
      log.info(`Notification server running on port ${SERVER_PORT}`);
    });

  } catch (error) {
    log.log('error', 'NotificationService startServer() method:', error);
  }
}
