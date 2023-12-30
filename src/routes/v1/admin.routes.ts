import { AdminController, AuthController } from '@src/controllers';
import { authenticate, validate } from '@src/middlewares';
import { AdminValidators, AuthValidators } from '@src/validators';
import { Router } from 'express';

const adminRouter = Router();

/**
 * Route configuration for generating an authentication token for an admin user.
 *
 * This GET endpoint allows an admin user to generate a new authentication token using a refresh token.
 * It is associated with the `generateToken` function in the `AuthController`.
 *
 * @endpoint GET /generate-token/:refreshToken
 * @validator AuthValidators.generateToken - Request parameter validation using the specified validator.
 * @controller AuthController.generateToken - The controller responsible for generating the authentication token.
 *
 * Note: This route is designed to allow an admin user to generate a new authentication token using a valid refresh token.
 * The generated token can be used for authentication purposes.
 */
adminRouter.get(
  '/generate-token/:refreshToken',
  validate(AuthValidators.generateToken),
  AuthController.generateToken,
);

/**
 * Route configuration for performing actions on a user by an admin user.
 *
 * This PATCH endpoint allows an admin user to perform actions such as activating, deactivating, or deleting a user.
 * It is associated with the `actionUser` function in the `AdminController`.
 *
 * @endpoint PATCH /action-user
 * @middleware authenticate.adminToken - Middleware for authenticating admin users.
 * @validator AdminValidators.actionUser - Request body validation using the specified validator.
 * @controller AdminController.actionUser - The controller responsible for performing actions on the user.
 *
 * Note: This route is designed to allow admin users to perform actions like activation, deactivation, or deletion on a user account.
 * The admin user provides the `user_id` and the `action` in the request body to specify the action to be performed.
 */
adminRouter.patch(
  '/action-user',
  authenticate.adminToken,
  validate(AdminValidators.actionUser),
  AdminController.actionUser,
);

export default adminRouter;
