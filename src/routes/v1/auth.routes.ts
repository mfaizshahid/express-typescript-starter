import { AuthController } from "@src/controllers";
import { authenticate, validate } from "@src/middlewares";
import { AuthValidators } from "@src/validators";
import { Router } from "express";

const authRouter = Router();
/**
 * Route configuration for user registration.
 *
 * This POST endpoint allows users to register for an account.
 * It is associated with the `register` function.
 *
 * @endpoint POST /register
 * @validator AuthValidators.register - Request body validation using the specified validator.
 * @controller AuthController.register - The controller responsible for user registration.
 *
 * Note: Users can register by providing their email, rolename, name, password, and username.
 * The registration process includes checking for existing email, role validation, password encryption,
 * creating a user payload, and generating authentication tokens.
 */
authRouter.post(
  "/register",
  validate(AuthValidators.register),
  AuthController.register,
);

/**
 * Route configuration for user login.
 *
 * This POST endpoint allows users to log in to their accounts.
 * It is associated with the `login` function.
 *
 * @endpoint POST /login
 * @validator AuthValidators.login - Request body validation using the specified validator.
 * @controller AuthController.login - The controller responsible for user login.
 *
 * Note: Users can log in by providing their email and password.
 * The login process includes checking for the existence of the user,
 * verifying the user's status (active or terminated), and comparing the provided password.
 * If all checks pass, authentication tokens are generated and returned to the client.
 */
authRouter.post("/login", validate(AuthValidators.login), AuthController.login);

/**
 * Route configuration for user logout.
 *
 * This GET endpoint allows users to log out of their accounts.
 * It is associated with the `logout` function.
 *
 * @endpoint GET /logout
 * @middleware authenticate.token - Middleware to verify and decode the JWT token from the authorization header.
 * @controller AuthController.logout - The controller responsible for user logout.
 *
 * Note: Users can log out by making a GET request to this endpoint. The middleware verifies the JWT token,
 * and the controller updates the user's refresh token to null, effectively logging them out.
 */
authRouter.get("/logout", authenticate.token, AuthController.logout);

/**
 * Route configuration for generating a new token using a refresh token.
 *
 * This GET endpoint allows clients to generate new authentication tokens (access and refresh tokens)
 * using a valid refresh token. It is associated with the `generateToken` function.
 *
 * @endpoint GET /generate-token/:refreshToken
 * @middleware validate(AuthValidators.generateToken) - Middleware to validate the refresh token payload in the request.
 * @controller AuthController.generateToken - The controller responsible for the token generation process.
 *
 * Note: Clients can generate new tokens by making a GET request to this endpoint with a valid refresh token.
 * The middleware ensures the validity of the request payload, and the controller handles the process of verifying the
 * refresh token, generating new tokens, and updating them in the user's record.
 */
authRouter.get(
  "/generate-token/:refreshToken",
  validate(AuthValidators.generateToken),
  AuthController.generateToken,
);
export default authRouter;
