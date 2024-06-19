import { authUserPayload, gigMockRequest, gigMockResponse, sellerGig } from '@gig/controllers/test/mocks/gig.mock';
import { Request, Response } from 'express';
import { gigCreateSchema } from '@gig/schemes/gig.scheme';
import { gigCreateController } from '@gig/controllers/create.controller';
import { BadRequestError } from '@hassonor/wisdomhub-shared';
import * as helper from '@hassonor/wisdomhub-shared';
import * as gigService from '@gig/services/gig.service';

jest.mock('@gig/services/gig.service');
jest.mock('@hassonor/wisdomhub-shared');
jest.mock('@gig/schemes/gig.scheme');
jest.mock('@gig/elasticsearch');
jest.mock('@elastic/elasticsearch');


describe('Create Controller', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Create new gig method', () => {
    it('should throw an error for invalid schema data', () => {
      const req: Request = gigMockRequest({}, sellerGig, authUserPayload) as unknown as Request;
      const res: Response = gigMockResponse();
      jest.spyOn(gigCreateSchema, 'validate').mockImplementation((): any => Promise.resolve({
        error: {
          name: 'ValidationError',
          isJoi: true,
          details: [{ message: 'This is an error message' }]
        }
      }));
      gigCreateController(req, res).catch(() => {
        expect(BadRequestError).toHaveBeenCalledWith('This is an error message', 'Create gig() method');
      });
    });
    it('should throw file upload error', () => {
      const req: Request = gigMockRequest({}, sellerGig, authUserPayload) as unknown as Request;
      const res: Response = gigMockResponse();
      jest.spyOn(gigCreateSchema, 'validate').mockImplementation((): any => Promise.resolve({
        error: {}
      }));

      jest.spyOn(helper, 'uploads').mockImplementation((): any => Promise.resolve({ public_id: '' }));
      gigCreateController(req, res).catch(() => {
        expect(BadRequestError).toHaveBeenCalledWith('File upload error. Try again.', ' Create gig() method');
      });
    });
    it('should create a new gig', async () => {
      const req: Request = gigMockRequest({}, sellerGig, authUserPayload) as unknown as Request;
      const res: Response = gigMockResponse();
      jest.spyOn(gigCreateSchema, 'validate').mockImplementation((): any => Promise.resolve({
        error: {}
      }));
      jest.spyOn(helper, 'uploads').mockImplementation((): any => Promise.resolve({ public_id: '11117' }));
      jest.spyOn(gigService, 'createGig').mockResolvedValue(sellerGig);

      await gigCreateController(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Gig created successfully.', gig: sellerGig
      });
    });
  });

});
