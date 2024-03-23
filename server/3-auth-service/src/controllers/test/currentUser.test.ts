import { Request, Response } from 'express';
import * as auth from '@auth/services/auth-service';
import { authMock, authMockRequest, authMockResponse, authUserPayload } from '@auth/controllers/test/mocks/auth.mock';
import { getCurrentUser } from '@auth/controllers/currentUser.controller';
import { StatusCodes } from 'http-status-codes';
import { Sequelize } from 'sequelize';

jest.mock('@auth/services/auth-service');
jest.mock('@hassonor/wisdomhub-shared');
jest.mock('@auth/queues/auth.producer.ts');
jest.mock('@elastic/elasticsearch');

const USERNAME = 'hasson_test';
const PASSWORD = 'test1';

let mockConnection: Sequelize;

describe('CurrentUser', () => {
  beforeEach(async () => {
    jest.resetAllMocks();
    mockConnection = new Sequelize(process.env.MYSQL_DB!, {
      dialect: 'mysql',
      logging: false,
      dialectOptions: {
        multipleStatements: true
      }
    });
    await mockConnection.sync({ force: true });
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await mockConnection.close();
  });

  describe('getCurrentUser method', () => {
    it('should return an authenticated user', async () => {
      const req: Request = authMockRequest({}, {
        username: USERNAME,
        password: PASSWORD
      }, authUserPayload) as unknown as Request;
      const res: Response = authMockResponse();
      jest.spyOn(auth, 'getAuthUserById').mockResolvedValue(authMock);

      await getCurrentUser(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({ message: 'Authenticated user', user: authMock });
    });
    it('should return empty user', async () => {
      const req: Request = authMockRequest({}, {
        username: USERNAME,
        password: PASSWORD
      }, authUserPayload) as unknown as Request;
      const res: Response = authMockResponse();
      jest.spyOn(auth, 'getAuthUserById').mockResolvedValue({} as never);

      await getCurrentUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Authenticated user',
        user: null
      });
    });

    it('should correctly handle an internal error scenario', async () => {
      const req: Request = authMockRequest({}, {}, authUserPayload) as unknown as Request;
      const res: Response = authMockResponse();
      jest.spyOn(auth, 'getAuthUserById').mockRejectedValue(new Error('Internal server error'));

      await getCurrentUser(req, res);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        error: 'An unexpected error occurred.'
      });
    });
  });
});
