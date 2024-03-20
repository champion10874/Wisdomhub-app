import client, { Channel, Connection } from 'amqplib';
import { winstonLogger } from '@hassonor/wisdomhub-shared';
import { authConfig } from '@auth/config';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${authConfig.ELASTIC_SEARCH_URL}`, 'authQueueConnection', 'debug');

async function createRabbitMQConnection(): Promise<Channel | undefined> {
  try {
    const connection: Connection = await client.connect(`${authConfig.RABBITMQ_ENDPOINT}`);
    const channel: Channel = await connection.createChannel();
    log.info('Auth server connected to queue successfully');
    closeRabbitMQConnection(channel, connection);

    return channel;
  } catch (error) {
    log.log('error', 'AuthService error createRabbitMQConnection() method:', error);
    return;
  }
}

function closeRabbitMQConnection(channel: Channel, connection: Connection): void {
  process.once('SIGINT', async () => {
    await channel.close();
    await connection.close();
  });
}

export { createRabbitMQConnection };
