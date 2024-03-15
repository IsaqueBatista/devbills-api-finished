import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z, ZodRawShape } from 'zod';

import { AppError } from '../errors/app.error';

export enum ParamsTypes {
  ROUTE = 'params',
  QUERY = 'query',
  BODY = 'body',
}

type ValidateParams = {
  schema: ZodRawShape;
  type: ParamsTypes;
};

export function validate(params: ValidateParams) {
  return (req: Request, _: Response, next: NextFunction) => {
    const result = z.object(params.schema).safeParse(req[params.type]);

    if (!result.success) {
      const errorsFormatted = result.error.issues.map(
        (item) => `${item.path.join('.')}: ${item.message}`,
      );

      throw new AppError(errorsFormatted, StatusCodes.UNPROCESSABLE_ENTITY);
    }

    req[params.type] = result.data;

    next();
  };
}
