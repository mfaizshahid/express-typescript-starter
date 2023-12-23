import { IApp, IUser } from "@src/interfaces";
import { AuthService, UserService } from "@src/services";
import { ApiError, ApiResponse, catchAsync, objPicker } from "@src/utils";
import httpStatus from "http-status";

/**
 * Controller function for user registration.
 *
 * This function performs the following operations:
 * 1. Extracts user registration data from the request body.
 * 2. Checks if the provided email is already taken in the database.
 * 3. Retrieves the user's role based on the provided rolename.
 * 4. Encrypts the user's password for security.
 * 5. Constructs a user payload for database insertion.
 * 6. Creates a new user in the database.
 * 7. Generates authentication tokens for the new user.
 * 8. Stores the refresh token in the database.
 * 9. Sends a success response with the user's data and tokens to the client.
 *
 * @param {Request} req - Express request object with the incoming registration data.
 * @param {Response} res - Express response object for sending the registration success response.
 * @returns {Promise<void>} - Promise indicating the completion of the controller function.
 *
 * Note: This controller handles the user registration process, ensuring that the provided email is unique,
 * the role exists, and the password is securely encrypted. It then creates a new user and returns the necessary tokens.
 */
const register = catchAsync(async (req, res): Promise<void> => {
  const { email, rolename, name, password, username } = req.body;
  // Check if email is already taken
  const user = await UserService.getUser({ email }); // Get user from db
  // If user exists, throw an error
  if (user) throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");

  // Get user role from req.body
  const role = await UserService.getRole({ name: rolename }); // Get role from db
  // If role does not exist, throw an error
  if (!role) throw new ApiError(httpStatus.BAD_REQUEST, "Role not found");

  // Encrypt password
  const hashedPassword = await AuthService.encryptPassword(password);
  // Create user payload
  const createUserPayload: IUser.RegisterUserPayload = {
    name: name,
    email: email,
    role_id: role.id,
    password: hashedPassword,
    active: false,
  };
  const newUser = await UserService.createUser(createUserPayload); // Create user in db
  // Generate auth tokens
  const tokens: IApp.AuthTokens = AuthService.generateAuthTokens(
    newUser.id,
    role.name,
  );
  // Pick user response fields
  const response = objPicker.recursive(newUser, IUser.AuthResponseKeys);
  // Storing refresh token in db
  await newUser.$query().update({ refresh_token: tokens.refresh_token });
  new ApiResponse({
    user: response,
    tokens,
  }).send(res);
});

export default {
  register,
};
