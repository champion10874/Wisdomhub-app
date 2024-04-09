import client, { Channel, Connection } from 'amqplib';
import { winstonLogger } from '@hassonor/wisdomhub-shared';
import { usersConfig } from '@users//config';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${usersConfig.ELASTIC_SEARCH_URL}`, 'usersQueueConnection', 'debug');

async function createRabbitMQConnection(): Promise<Channel | undefined> {
  try {
    const connection: Connection = await client.connect(`${usersConfig.RABBITMQ_ENDPOINT}`);
    const channel: Channel = await connection.createChannel();
    log.info('Users server connected to queue successfully');
    closeRabbitMQConnection(channel, connection);
    return channel;
  } catch (error) {
    log.log('error', 'UsersService error createRabbitMQConnection() method:', error);
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
