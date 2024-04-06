import { Client } from '@elastic/elasticsearch';
import { usersConfig } from '@users/config';
import { winstonLogger } from '@hassonor/wisdomhub-shared';
import { Logger } from 'winston';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';

const log: Logger = winstonLogger(`${usersConfig.ELASTIC_SEARCH_URL}`, 'usersElasticSearch', 'debug');

const elasticSearchClient = new Client({
  node: `${usersConfig.ELASTIC_SEARCH_URL}`
});

const checkElasticSearchConnection = async (): Promise<void> => {
  let isConnected = false;

  while (!isConnected) {
    try {
      const health: ClusterHealthResponse = await elasticSearchClient.cluster.health({});
      log.info(`UsersService Elasticsearch health status - ${health.status}`);
      isConnected = true;
    } catch (error) {
      log.error('Connection to ElasticSearch failed. Retrying...');
      log.log('error', 'UsersService checkConnection() method:', error);
    }
  }
};

export { checkElasticSearchConnection };
