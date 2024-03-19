import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

export class HealthControllers {
  public health(_req: Request, res: Response): void {
    res.status(StatusCodes.OK).send('API Gateway service is healthy and OK.');
  }
}

export const healthControllers: HealthControllers = new HealthControllers();
