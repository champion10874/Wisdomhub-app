import { Client } from '@elastic/elasticsearch';
import { notificationConfig } from '@notifications/config';
import { winstonLogger } from '@hassonor/wisdomhub-shared';
import { Logger } from 'winston';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';

const log: Logger = winstonLogger(`${notificationConfig.ELASTIC_SEARCH_URL}`, 'notificationElasticSearch', 'debug');


const elasticSearchClient = new Client({
  node: `${notificationConfig.ELASTIC_SEARCH_URL}`
});

export async function checkElasticSearchConnection(): Promise<void> {
  let isConnected = false;

  while (!isConnected) {
    try {
      const health: ClusterHealthResponse = await elasticSearchClient.cluster.health({});
      log.info(`NotificationService Elasticsearch health status - ${health.status}`);
      isConnected = true;
    } catch (error) {
      log.error('Connection to ElasticSearch failed. Retrying...');
      log.log('error', 'NotificationService checkConnection() method:', (error as Error).message);
    }
  }
}
