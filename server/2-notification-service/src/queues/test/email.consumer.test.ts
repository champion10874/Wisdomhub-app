import amqp from 'amqplib';
import * as connection from '@notifications/queues/connection';
import { consumeAuthEmailMessages, consumeOrderEmailMessages } from '@notifications/queues/email.consumer';

jest.mock('@notifications/queues/connection');
jest.mock('amqplib');
jest.mock('@hassonor/wisdomhub-shared');

describe('Email Consumer', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('consumeAuthEmailMessages', () => {
    it('should create the queue', async () => {
      const channel = {
        assertExchange: jest.fn(),
        publish: jest.fn(),
        assertQueue: jest.fn(),
        bindQueue: jest.fn(),
        consume: jest.fn()
      };

      jest.spyOn(channel, 'assertExchange');
      jest.spyOn(channel, 'assertQueue').mockReturnValue({
        queue: 'auth-email-queue',
        messageCount: 0,
        consumerCount: 0
      });
      jest.spyOn(connection, 'createRabbitMQConnection').mockReturnValue(channel as never);

      const connectionChannel: amqp.Channel | undefined = await connection.createRabbitMQConnection();
      await consumeAuthEmailMessages(connectionChannel!);

      expect(connectionChannel!.assertExchange).toHaveBeenCalledWith('wisdomhub-email-notification', 'direct');
      expect(connectionChannel!.assertQueue).toHaveBeenCalledTimes(1);
      expect(connectionChannel!.consume).toHaveBeenCalledTimes(1);
      expect(connectionChannel!.bindQueue).toHaveBeenCalledWith('auth-email-queue', 'wisdomhub-email-notification', 'auth-email');
    });
  });
  describe('consumeOrderEmailMessages', () => {
    it('should create the queue', async () => {
      const channel = {
        assertExchange: jest.fn(),
        publish: jest.fn(),
        assertQueue: jest.fn(),
        bindQueue: jest.fn(),
        consume: jest.fn()
      };

      jest.spyOn(channel, 'assertExchange');
      jest.spyOn(channel, 'assertQueue').mockReturnValue({
        queue: 'order-email-queue',
        messageCount: 0,
        consumerCount: 0
      });
      jest.spyOn(connection, 'createRabbitMQConnection').mockReturnValue(channel as never);

      const connectionChannel: amqp.Channel | undefined = await connection.createRabbitMQConnection();
      await consumeOrderEmailMessages(connectionChannel!);

      expect(connectionChannel!.assertExchange).toHaveBeenCalledWith('wisdomhub-order-notification', 'direct');
      expect(connectionChannel!.assertQueue).toHaveBeenCalledTimes(1);
      expect(connectionChannel!.consume).toHaveBeenCalledTimes(1);
      expect(connectionChannel!.bindQueue).toHaveBeenCalledWith('order-email-queue', 'wisdomhub-order-notification', 'order-email');
    });
  });
});



