import { Client } from '@elastic/elasticsearch';
import { gigConfig } from '@gig/config';
import { winstonLogger } from '@hassonor/wisdomhub-shared';
import { Logger } from 'winston';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';

const log: Logger = winstonLogger(`${gigConfig.ELASTIC_SEARCH_URL}`, 'gigElasticSearch', 'debug');

const elasticSearchClient = new Client({
  node: `${gigConfig.ELASTIC_SEARCH_URL}`
});

const checkConnection = async (): Promise<void> => {
  let isConnected = false;

  while (!isConnected) {
    try {
      const health: ClusterHealthResponse = await elasticSearchClient.cluster.health({});
      log.info(`GigService Elasticsearch health status - ${health.status}`);
      isConnected = true;
    } catch (error) {
      log.error('Connection to ElasticSearch failed. Retrying...');
      log.log('error', 'GigService checkConnection() method:', error);
    }
  }
};

export { checkConnection };
