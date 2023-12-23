import { AuthController } from "@src/controllers";
import { adminMiddleware, validate } from "@src/middlewares";
import { AuthValidators } from "@src/validators";
import { Router } from "express";

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
  "/generate-token/:refreshToken",
  validate(AuthValidators.generateToken),
  AuthController.generateToken,
);

export default adminRouter;
