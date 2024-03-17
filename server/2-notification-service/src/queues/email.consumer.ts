import { Channel, ConsumeMessage } from 'amqplib';
import { notificationConfig } from '@notifications/config';
import { IEmailLocals, winstonLogger } from '@hassonor/wisdomhub-shared';
import { Logger } from 'winston';
import { createRabbitMQConnection } from '@notifications/queues/connection';
import { sendEmail } from '@notifications/queues/mail.transport';

const log: Logger = winstonLogger(`${notificationConfig.ELASTIC_SEARCH_URL}`, 'emailConsumer', 'debug');

async function consumeAuthEmailMessages(channel: Channel): Promise<void> {
  try {
    if (!channel) {
      channel = await createRabbitMQConnection() as Channel;
    }

    const exchangeName = 'wisdomhub-email-notification';
    const routingKey = 'auth-email';
    const queueName = 'auth-email-queue';

    await channel.assertExchange(exchangeName, 'direct');
    const wisdomhubQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });

    await channel.bindQueue(wisdomhubQueue.queue, exchangeName, routingKey);
    channel.consume(wisdomhubQueue.queue, async (msg: ConsumeMessage | null) => {
      const { receiverEmail, username, verifyLink, resetLink, template } = JSON.parse(msg!.content.toString());
      const locals: IEmailLocals = {
        appLink: `{notificationConfig.CLIENT_URL}`,
        appIcon: 'https://i.ibb.co/xL34xgK/wisdomhub-Icon.jpg',
        username,
        verifyLink,
        resetLink
      };
      await sendEmail(template, receiverEmail, locals);
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

    const exchangeName = 'wisdomhub-order-notification';
    const routingKey = 'order-email';
    const queueName = 'order-email-queue';

    await channel.assertExchange(exchangeName, 'direct');
    const wisdomhubQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });

    await channel.bindQueue(wisdomhubQueue.queue, exchangeName, routingKey);
    channel.consume(wisdomhubQueue.queue, async (msg: ConsumeMessage | null) => {
      const {
        receiverEmail,
        username,
        template,
        sender,
        offerLink,
        amount,
        buyerUsername,
        sellerUsername,
        title,
        description,
        deliveryDays,
        orderId,
        orderDue,
        requirements,
        orderUrl,
        originalDate,
        newDate,
        reason,
        subject,
        header,
        type,
        message,
        serviceFee,
        total
      } = JSON.parse(msg!.content.toString());
      const locals: IEmailLocals = {
        appLink: `${notificationConfig.CLIENT_URL}`,
        appIcon: 'https://i.ibb.co/xL34xgK/wisdomhub-Icon.jpg',
        username,
        sender,
        offerLink,
        amount,
        buyerUsername,
        sellerUsername,
        title,
        description,
        deliveryDays,
        orderId,
        orderDue,
        requirements,
        orderUrl,
        originalDate,
        newDate,
        reason,
        subject,
        header,
        type,
        message,
        serviceFee,
        total
      };
      if (template === 'orderPlaced') {
        await sendEmail('orderPlaced', receiverEmail, locals);
        await sendEmail('orderReceipt', receiverEmail, locals);
      } else {
        await sendEmail(template, receiverEmail, locals);
      }
      channel.ack(msg!);
    });

  } catch (error) {
    log.log('error', 'NotificationService EmailConsumer consumeOrderEmailMessages() method error:', error);
  }
}

export { consumeAuthEmailMessages, consumeOrderEmailMessages };
