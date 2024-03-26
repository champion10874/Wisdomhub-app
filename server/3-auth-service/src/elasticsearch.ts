import { Logger } from 'winston';
import { ISellerGig, winstonLogger } from '@hassonor/wisdomhub-shared';
import { Client } from '@elastic/elasticsearch';
import { ClusterHealthResponse, GetResponse } from '@elastic/elasticsearch/lib/api/types';
import { authConfig } from '@auth/config';

const log: Logger = winstonLogger(`${authConfig.ELASTIC_SEARCH_URL}`, 'apiAuthServiceElasticConnection', 'debug');

const elasticSearchClient = new Client({
  node: `${authConfig.ELASTIC_SEARCH_URL}`
});

async function checkConnection(): Promise<void> {
  let isConnected = false;
  while (!isConnected) {
    log.info('AuthService connecting to ElasticSearch...');
    try {
      const health: ClusterHealthResponse = await elasticSearchClient.cluster.health({});
      log.info(`AuthService Elasticsearch health status - ${health.status}`);
      isConnected = true;
    } catch (error) {
      log.error('Connection to Elasticsearch failed. Retrying...');
      log.log('error', 'AuthService checkConnection() method:', error);
    }
  }
}

async function createIndex(indexName: string): Promise<void> {
  try {
    const result: boolean = await elasticSearchClient.indices.exists({ index: indexName });
    if (result) {
      log.info(`Index "${indexName}" already exist.`);
    } else {
      await elasticSearchClient.indices.create({ index: indexName });
      await elasticSearchClient.indices.refresh({ index: indexName });
      log.info(`Created index ${indexName}`);
    }
  } catch (error) {
    log.error(`An error occurred while creating the index ${indexName}`);
    log.log('error', 'AuthService createIndex() method error:', error);
  }
}

async function getDocumentById(index: string, gigId: string): Promise<ISellerGig> {
  try {
    const result: GetResponse = await elasticSearchClient.get({
      index,
      id: gigId
    });
    return result._source as ISellerGig;
  } catch (error) {
    log.log('error', 'AuthService elasticsearch getDocumentById() method error:', error);
    return {} as ISellerGig;
  }
}

export { elasticSearchClient, checkConnection, createIndex, getDocumentById };
