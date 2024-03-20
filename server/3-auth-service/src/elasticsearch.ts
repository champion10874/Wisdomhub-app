import { Logger } from 'winston';
import { winstonLogger } from '@hassonor/wisdomhub-shared';
import { Client } from '@elastic/elasticsearch';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';
import { authConfig } from '@auth/config';

const log: Logger = winstonLogger(`${authConfig.ELASTIC_SEARCH_URL}`, 'apiAuthServiceElasticConnection', 'debug');

class Elasticsearch {
  private elasticSearchClient: Client;

  constructor() {
    this.elasticSearchClient = new Client({
      node: `${authConfig.ELASTIC_SEARCH_URL}`
    });
  }

  public async checkConnection(): Promise<void> {
    let isConnected = false;
    while (!isConnected) {
      log.info('AuthService connecting to ElasticSearch...');
      try {
        const health: ClusterHealthResponse = await this.elasticSearchClient.cluster.health({});
        log.info(`AuthService ElasticSearch health status - ${health.status}`);
        isConnected = true;
      } catch (error) {
        log.error('Auth Service -> Connection to ElasticSearch failed, Retrying...');
        log.log('error', 'AuthService checkConnection() method error:', error);
      }
    }
  }
}

export const elasticSearch: Elasticsearch = new Elasticsearch();
