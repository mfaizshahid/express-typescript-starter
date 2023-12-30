import { env } from '@src/config';
import { AuthService } from '@src/services';
import { ApiError } from '@src/utils';
import { type NextFunction, type Request, type Response } from 'express';
import httpStatus from 'http-status';

/**
 * Middleware function to verify and decode the JWT token from the authorization header.
 *
 * This middleware performs the following operations:
 * 1. Extracts the JWT token from the authorization header.
 * 2. Verifies the token using the access secret.
 * 3. Attaches the user ID to the request object for later use.
 * 4. Calls the next middleware in the chain if successful.
 *
 * @param {Request} req - Express request object with the JWT token in the authorization header.
 * @param {Response} res - Express response object for sending responses.
 * @param {NextFunction} next - Express next function to pass control to the next middleware.
 * @returns {void} - Middleware does not return a value; it attaches the user ID to the request object.
 *
 * Note: This middleware is used to authenticate and decode the JWT token sent in the authorization header.
 */
const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    // Get the JWT token from the authorization header
    const authHeader = req.headers.authorization;
    if (authHeader == null || !authHeader.startsWith('Bearer ')) {
      next(new ApiError(httpStatus.UNAUTHORIZED, 'Token is required'));
      return;
    }
    const token = authHeader.split(' ')[1];
    // Verify the JWT token using the access secret
    const payload = AuthService.verifyToken(token);
    // Attach the user ID to the request object for later use
    req.user = {
      id: parseInt(payload.sub as string, 10) ?? null,
    };
    // Call the next middleware in the chain
    next();
  } catch (e) {
    next(e);
  }
};

/**
 * Middleware function to verify and decode the JWT admin token from the authorization header.
 *
 * This middleware performs the following operations:
 * 1. Extracts the JWT token from the authorization header.
 * 2. Verifies the token using the admin access secret.
 * 3. Attaches the admin user ID to the request object for later use.
 * 4. Calls the next middleware in the chain if successful.
 *
 * @param {Request} req - Express request object with the JWT token in the authorization header.
 * @param {Response} res - Express response object for sending responses.
 * @param {NextFunction} next - Express next function to pass control to the next middleware.
 * @returns {void} - Middleware does not return a value; it attaches the admin user ID to the request object.
 *
 * Note: This middleware is used to authenticate and decode the JWT admin token sent in the authorization header.
 */
const authenticateAdminToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    // Get the JWT token from the authorization header
    const authHeader = req.headers.authorization;
    if (authHeader == null || !authHeader.startsWith('Bearer ')) {
      next(new ApiError(httpStatus.UNAUTHORIZED, 'Token is required'));
      return;
    }
    const token = authHeader.split(' ')[1];
    // Verify the JWT token using the access secret
    const payload = AuthService.verifyToken(
      token,
      env.jwt.adminAccessTokenSecret,
    );
    // Attach the user ID to the request object for later use
    req.user = {
      id: parseInt(payload.sub as string, 10) ?? null,
    };
    // Call the next middleware in the chain
    next();
  } catch (e) {
    next(e);
  }
};
export default {
  token: authenticateToken,
  adminToken: authenticateAdminToken,
};
