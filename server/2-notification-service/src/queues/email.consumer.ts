import { Channel, ConsumeMessage } from 'amqplib';
import { notificationConfig } from '@notifications/config';
import { winstonLogger } from '@hassonor/wisdomhub-shared';
import { Logger } from 'winston';
import { createRabbitMQConnection } from '@notifications/queues/connection';

const log: Logger = winstonLogger(`${notificationConfig.ELASTIC_SEARCH_URL}`, 'emailConsumer', 'debug');

async function consumeAuthEmailMessages(channel: Channel): Promise<void> {
  try {
    if (!channel) {
      channel = await createRabbitMQConnection() as Channel;
    }

    const exchangeName = 'jobber-email-notification';
    const routingKey = 'auth-email';
    const queueName = 'auth-email-queue';

    await channel.assertExchange(exchangeName, 'direct');
    const jobberQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });

    await channel.bindQueue(jobberQueue.queue, exchangeName, routingKey);
    channel.consume(jobberQueue.queue, async (msg: ConsumeMessage | null) => {
      console.log(JSON.parse(msg!.content.toString()));
      // send emails
      // acknowledge
      channel.ack(msg!);
    });

  } catch (error) {
    log.log('error', 'NotificationService EmailConsumer consumeAuthEmailMessages() method error:', error);
  }
}


async function consumeOrderEmailMessages(channel: Channel): Promise<void> {
  try {
    if (!channel) {
      channel = await createRabbitMQConnection() as Channel;
    }

    const exchangeName = 'jobber-order-notification';
    const routingKey = 'order-email';
    const queueName = 'order-email-queue';

    await channel.assertExchange(exchangeName, 'direct');
    const jobberQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });

    await channel.bindQueue(jobberQueue.queue, exchangeName, routingKey);
    channel.consume(jobberQueue.queue, async (msg: ConsumeMessage | null) => {
      console.log(JSON.parse(msg!.content.toString()));
      // send emails
      // acknowledge
      channel.ack(msg!);
    });

  } catch (error) {
    log.log('error', 'NotificationService EmailConsumer consumeOrderEmailMessages() method error:', error);
  }
}

export { consumeAuthEmailMessages, consumeOrderEmailMessages };
