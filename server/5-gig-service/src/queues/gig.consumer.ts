import { Logger } from 'winston';
import { gigConfig } from '@gig/config';
import { winstonLogger } from '@hassonor/wisdomhub-shared';
import { createRabbitMQConnection } from '@gig/queues/connection';
import { Channel, ConsumeMessage } from 'amqplib';
import { updateGigReview } from '@gig/services/gig.service';


const log: Logger = winstonLogger(`${gigConfig.ELASTIC_SEARCH_URL}`, 'gigServiceConsumer', 'debug');


const consumeGigDirectMessage = async (channel: Channel): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createRabbitMQConnection()) as Channel;
    }
    const exchangeName = 'wisdomhub-update-gig';
    const routingKey = 'update-gig';
    const queueName = 'gig-update-queue';

    await channel.assertExchange(exchangeName, 'direct');
    const wisdomhubQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(wisdomhubQueue.queue, exchangeName, routingKey);
    channel.consume(wisdomhubQueue.queue, async (msg: ConsumeMessage | null) => {
      const { gigReview } = JSON.parse(msg!.content.toString());
      await updateGigReview(JSON.parse(gigReview));
      channel.ack(msg!);
    });
  } catch (error) {
    log.log('error', 'GigService GigConsumer consumeGigDirectMessage() method error:', error);
  }
};

const consumeSeedDirectMessages = async (channel: Channel): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createRabbitMQConnection()) as Channel;
    }
    const exchangeName = 'wisdomhub-seed-gig';
    const routingKey = 'receive-sellers';
    const queueName = 'seed-gig-queue';

    await channel.assertExchange(exchangeName, 'direct');
    const wisdomhubQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(wisdomhubQueue.queue, exchangeName, routingKey);
    channel.consume(wisdomhubQueue.queue, async (msg: ConsumeMessage | null) => {
      //TODO: use seed data function
      channel.ack(msg!);
    });
  } catch (error) {
    log.log('error', 'GigService GigConsumer consumeGigDirectMessage() method error:', error);
  }
};


export { consumeGigDirectMessage, consumeSeedDirectMessages };
