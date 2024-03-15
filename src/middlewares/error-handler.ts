import { NextFunction, Request, Response } from 'express';

import { AppError } from '../errors/app.error';

export function expressErrorHandler(
  error: AppError | Error,
  _: Request,
  res: Response,
  __: NextFunction,
) {
  if (error instanceof Error) {
    return res.status(500).send({
      message: error.message,
    });
  }

  return res.status(error.statusCode).send({
    message: error.message,
  });
}
