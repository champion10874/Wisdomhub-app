import http from 'http';
import 'express-async-errors';
import { IEmailMessageDetails, winstonLogger } from '@hassonor/wisdomhub-shared';
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
  const verificationLink = `${notificationConfig.CLIENT_URL}/confirm_email?v_token=123124124gsdlkj`;
  const messageDetails: IEmailMessageDetails = {
    receiverEmail: `${notificationConfig.SENDER_EMAIL}`,
    resetLink: verificationLink,
    username: 'hassonor',
    template: 'forgotPassword'
  };
  await emailChannel.assertExchange('wisdomhub-email-notification', 'direct');
  const message1 = JSON.stringify(messageDetails);
  emailChannel.publish('wisdomhub-email-notification', 'auth-email', Buffer.from(message1));
  //
  // await emailChannel.assertExchange('wisdomhub-order-notification', 'direct');
  // const message2 = JSON.stringify({ name: 'wisdomhub', service: 'notification order service' });
  // emailChannel.publish('wisdomhub-order-notification', 'order-email', Buffer.from(message2));
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
