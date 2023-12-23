import { AuthController } from "@src/controllers";
import { validate } from "@src/middlewares";
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
export default authRouter;
