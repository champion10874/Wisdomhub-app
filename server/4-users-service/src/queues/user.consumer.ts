import { Logger } from 'winston';
import { IBuyerDocument, ISellerDocument, winstonLogger } from '@hassonor/wisdomhub-shared';
import { usersConfig } from '@users/config';
import { Channel, ConsumeMessage } from 'amqplib';
import { createRabbitMQConnection } from '@users/queues/connection';
import { createBuyer, updateBuyerPurchasedGigsProp } from '@users/services/buyer.service';
import {
  getRandomSellers,
  updateSellerCancelledJobsProp,
  updateSellerCompletedJobsProp,
  updateSellerOngoingJobsProp,
  updateSellerReview,
  updateTotalGigsCount
} from '@users/services/seller.service';
import { publishDirectMessage } from '@users/queues/user.producer';

const log: Logger = winstonLogger(`${usersConfig.ELASTIC_SEARCH_URL}`, 'usersServiceConsumer', 'debug');

const consumeBuyerDirectMessage = async (channel: Channel): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createRabbitMQConnection()) as Channel;
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

const consumeSellerDirectMessage = async (channel: Channel): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createRabbitMQConnection()) as Channel;
    }
    const exchangeName = 'wisdomhub-seller-update';
    const routingKey = 'user-seller';
    const queueName = 'user-seller-queue';

    await channel.assertExchange(exchangeName, 'direct');
    const wisdomhubQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(wisdomhubQueue.queue, exchangeName, routingKey);
    channel.consume(wisdomhubQueue.queue, async (msg: ConsumeMessage | null) => {
      const { type, sellerId, ongoingJobs, completedJobs, totalEarnings, recentDelivery, gigSellerId, count } = JSON.parse(
        msg!.content.toString()
      );
      if (type === 'create-order') {
        await updateSellerOngoingJobsProp(sellerId, ongoingJobs);
      } else if (type === 'approve-order') {
        await updateSellerCompletedJobsProp({
          sellerId,
          ongoingJobs,
          completedJobs,
          totalEarnings,
          recentDelivery
        });
      } else if (type === 'update-gigs-count') {
        await updateTotalGigsCount(`${gigSellerId}`, count);
      } else if (type === 'cancel-order') {
        await updateSellerCancelledJobsProp(sellerId);
      }
      channel.ack(msg!);
    });
  } catch (error) {
    log.log('error', 'UsersService UserConsumer consumerSellerDirectMessage() method error:', error);
  }
};

const consumeReviewFanoutMessages = async (channel: Channel): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createRabbitMQConnection()) as Channel;
    }
    const exchangeName = 'wisdomhub-review';
    const queueName = 'seller-review-queue';

    await channel.assertExchange(exchangeName, 'fanout');
    const wisdomhubQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(wisdomhubQueue.queue, exchangeName, '');
    channel.consume(wisdomhubQueue.queue, async (msg: ConsumeMessage | null) => {
      const { type } = JSON.parse(msg!.content.toString());
      if (type === 'buyer-review') {
        await updateSellerReview(JSON.parse(msg!.content.toString()));
        await publishDirectMessage(
          channel,
          'wisdomhub-update-gig',
          'update-gig',
          JSON.stringify({ type: 'updateGig', gigReview: msg!.content.toString() }),
          'Message sent to gig service.'
        );
      }
      channel.ack(msg!);
    });
  } catch (error) {
    log.log('error', 'UsersService UserConsumer consumeReviewFanoutMessages() method error:', error);
  }
};

const consumeSeedGigDirectMessages = async (channel: Channel): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createRabbitMQConnection()) as Channel;
    }
    const exchangeName = 'jobber-gig';
    const routingKey = 'get-sellers';
    const queueName = 'user-gig-queue';

    await channel.assertExchange(exchangeName, 'direct');
    const wisdomhubQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(wisdomhubQueue.queue, exchangeName, routingKey);
    channel.consume(wisdomhubQueue.queue, async (msg: ConsumeMessage | null) => {
      const { type } = JSON.parse(msg!.content.toString());
      if (type === 'getSellers') {
        const { count } = JSON.parse(msg!.content.toString());
        const sellers: ISellerDocument[] = await getRandomSellers(parseInt(count, 10));
        await publishDirectMessage(
          channel,
          'wisdomhub-seed-gig',
          'receive-sellers',
          JSON.stringify({ type: 'receiveSellers', sellers, count }),
          'Message sent to gig service.'
        );
      }
      channel.ack(msg!);
    });
  } catch (error) {
    log.log('error', 'UsersService UserConsumer consumeSeedGigDirectMessages() method error:', error);
  }
};

export { consumeBuyerDirectMessage, consumeSellerDirectMessage, consumeReviewFanoutMessages, consumeSeedGigDirectMessages };
