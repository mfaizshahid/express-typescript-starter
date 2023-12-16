import { type NextFunction, type Request, type Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { IApp } from "@src/interfaces";
import { env, logger } from "@src/config";
import httpStatus from "http-status";

const globalErrorHandler = (
  err: IApp.ExtendedError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let { statusCode, message } = err;
  const response = {
    statusCode: statusCode ?? 500,
    statusMessage: message ?? "INTERNAL_SERVER_ERROR",
    ...(env.env === IApp.AppEnvTypes.DEVELOPMENT && { stack: err.stack }),
  };
  if (env.env === IApp.AppEnvTypes.DEVELOPMENT) {
    logger.error(err);
  }
  // Handle json web token errors
  if (
    err.name === TokenExpiredError.name ||
    err.name === JsonWebTokenError.name
  ) {
    response.statusCode = httpStatus.UNAUTHORIZED;
    statusCode = httpStatus.UNAUTHORIZED;
    message =
      err.name === JsonWebTokenError.name
        ? "Invalid Token"
        : "Token is expired";
    response.statusMessage = message;
  }
  res.status(statusCode ?? 500).json(response);
};

export default globalErrorHandler;
