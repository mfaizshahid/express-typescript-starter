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
export default authRouter;
