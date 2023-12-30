import { type NextFunction, type Request, type Response } from 'express';

/**
 * Middleware to append admin status to the request object.
 *
 * This middleware function sets a flag on the request object to indicate that the user is an admin.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function to pass control to the next middleware.
 * @returns {void}
 *
 * Note: This middleware is used to mark a user as an admin by setting the `adminUser` flag on the request object.
 * It is typically used to distinguish admin users from regular users in subsequent middleware or controllers.
 */
const appendAdmin = (req: Request, res: Response, next: NextFunction): void => {
  req.adminUser = true;
  next();
};

export default {
  appendAdmin,
};
