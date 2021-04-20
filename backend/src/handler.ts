import * as express from "express";

import { logger } from "./helpers/log.helper";

export const asyncHandler = (fn: express.RequestHandler) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => Promise.resolve(fn(req, res, next)).catch(next);

export const errorHandler = (err, req, res, next) => {
  if (err) {
    if (res.statusCode < 400) {
      // If no error status code has been set, use 500 by default
      res.status(500);
    }

    logger.error(err.message);

    // Send the error details
    res.json({ error: err.message });
  }
  next();
};
