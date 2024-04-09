import { Logger } from 'winston';
import { IBuyerDocument, winstonLogger } from '@hassonor/wisdomhub-shared';
import { usersConfig } from '@users/config';
import { Channel, ConsumeMessage } from 'amqplib';
import { createRabbitMQConnection } from '@users/queues/connection';
import { createBuyer, updateBuyerPurchasedGigsProp } from '@users/services/buyer.service';


const log: Logger = winstonLogger(`${usersConfig.ELASTIC_SEARCH_URL}`,
  'usersServiceConsumer', 'debug');

const conusmeBuyerDirectMessage = async (channel: Channel): Promise<void> => {
  try {
    if (!channel) {
      channel = await createRabbitMQConnection() as Channel;
    }
    const exchangeName = 'wisdomhub-buyer-update';
    const routingKey = 'user-buyer';
    const queueName = 'user-buyer-queue';

    await channel.assertExchange(exchangeName, 'direct');
    const wisdomhubQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(wisdomhubQueue.queue, exchangeName, routingKey);
    channel.consume(wisdomhubQueue.queue, async (msg: ConsumeMessage | null) => {
      const { type } = JSON.parse(msg!.content.toString());
      if (type == 'auth') {
        const { username, email, profilePicture, country, createdAt } = JSON.parse(msg!.content.toString());
        const buyer: IBuyerDocument = {
          username,
          email,
          profilePicture,
          country,
          purchasedGigs: [],
          createdAt
        };
        await createBuyer(buyer);
      } else {
        const { buyerId, purchasedGigs } = JSON.parse(msg!.content.toString());
        await updateBuyerPurchasedGigsProp(buyerId, purchasedGigs, type);
      }
    });
  } catch (error) {
    log.log('error', 'UsersService UserConsumer consumerBuyerDirectMessage() method error:', error);
  }
};

export { conusmeBuyerDirectMessage };

