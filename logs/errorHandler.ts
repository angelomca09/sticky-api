import { NextFunction, Request, Response } from 'express';

export function customErrorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  logger.error(`${req.method} ${req.baseUrl} ${(req as any).message}`);
  res.status(400).send({ error: err.message });
};