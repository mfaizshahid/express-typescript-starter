import {
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
} from 'express';

/**
 * Wraps an asynchronous route handler function and catches any errors that occur.
 * Passes errors to Express error handling middleware using the `next()` function.
 *
 * @param fn{RequestHandler} - The asynchronous route handler function to be wrapped.
 * @returns {function} A function that handles route requests.
 */
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      next(err);
    });
  };
};

export default catchAsync;
