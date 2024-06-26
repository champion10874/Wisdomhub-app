import { winstonLogger } from '@hassonor/wisdomhub-shared';
import { Logger } from 'winston';
import { gatewayConfig } from '@gateway/config';
import { createClient } from 'redis';


type RedisClient = ReturnType<typeof createClient>;
const log: Logger = winstonLogger(`${gatewayConfig.ELASTIC_SEARCH_URL}`, 'gatewayRedisConnection', 'debug');

class RedisConnection {
  client: RedisClient;

  constructor() {
    this.client = createClient({ url: `${gatewayConfig.REDIS_HOST}` });
  }

  public redisConnect = async (): Promise<void> => {
    try {
      await this.client.connect();
      log.info(`GatewayService Redis Connection: ${await this.client.ping()}`);
      this.cacheError();
    } catch (error) {
      log.log('error', 'GatewayService redisConnect() method error:', error);
    }
  };
  private cacheError = (): void => {
    this.client.on('error', (error: unknown) => {
      log.error(error);
    });
  };
}

export const redisConnection: RedisConnection = new RedisConnection();
