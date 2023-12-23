import { env } from "@src/config";
import { IApp, IUser } from "@src/interfaces";
import { UserShape } from "@src/models";
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
  const createUserPayload: UserShape = {
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
  await UserService.updateUser(newUser.id, {
    refresh_token: tokens.refresh_token,
  });
  new ApiResponse({
    user: response,
    tokens,
  }).send(res);
});

/**
 * Controller function for user login.
 *
 * This function performs the following operations:
 * 1. Extracts user login credentials from the request body.
 * 2. Checks if the user exists in the database based on the provided email.
 * 3. Handles cases where the user is not found, is terminated, or is not activated.
 * 4. Compares the provided password with the stored encrypted password.
 * 5. Generates authentication tokens upon successful login.
 * 6. Updates the user's refresh token in the database.
 * 7. Sends a success response with the user's data and tokens to the client.
 *
 * @param {Request} req - Express request object with the incoming login credentials.
 * @param {Response} res - Express response object for sending the login success response.
 * @returns {Promise<void>} - Promise indicating the completion of the controller function.
 *
 * Note: This controller handles user login, including verifying user existence, status, and password.
 * If all checks pass, it generates authentication tokens and sends them along with the user's data to the client.
 */
const login = catchAsync(async (req, res): Promise<void> => {
  const { email, password } = req.body;
  // Check if user exists
  const user = await UserService.getUser({ email });
  // If user does not exist, throw an error
  if (!user)
    throw new ApiError(httpStatus.BAD_REQUEST, "Wrong email or password");
  // Check user is deleted
  if (user.deleted_at)
    throw new ApiError(httpStatus.BAD_REQUEST, "Account Terminated");

  // Check if user is active
  if (!user.active)
    throw new ApiError(httpStatus.BAD_REQUEST, "Account not activated");

  // Check if password matches
  const isMatch = await AuthService.comparePassword(password, user.password);
  // If password does not match, throw an error
  if (!isMatch)
    throw new ApiError(httpStatus.BAD_REQUEST, "Wrong email or password");

  // Generate auth tokens
  const tokens: IApp.AuthTokens = AuthService.generateAuthTokens(
    user.id,
    user.role_details.name,
  );
  // Pick user response fields
  const response = objPicker.recursive(user, IUser.AuthResponseKeys);
  // Storing refresh token in db
  await UserService.updateUser(user.id, {
    refresh_token: tokens.refresh_token,
  });
  new ApiResponse({
    user: response,
    tokens,
  }).send(res);
});

/**
 * Controller function for user logout.
 *
 * This function performs the following operations:
 * 1. Fetches the user based on the user ID attached to the request object.
 * 2. Handles cases where the user is not found.
 * 3. Updates the user's refresh token to null, effectively logging them out.
 * 4. Sends a success response to the client.
 *
 * @param {Request} req - Express request object with the authenticated user's ID.
 * @param {Response} res - Express response object for sending the logout success response.
 * @returns {Promise<void>} - Promise indicating the completion of the controller function.
 *
 * Note: This controller handles user logout by updating the user's refresh token to null,
 * effectively revoking their access. It then sends a success response to the client.
 */
const logout = catchAsync(async (req, res): Promise<void> => {
  const { user } = req;
  if (!user?.id) throw new ApiError(httpStatus.BAD_REQUEST, "User not found");

  // Fetch user from db
  const existingUser = await UserService.getUser({ id: user.id });
  // If user does not exist, throw an error
  if (!existingUser)
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  // Update refresh token
  await existingUser.$query().patch({ refresh_token: null });
  new ApiResponse({}).send(res);
});

/**
 * Generates new authentication tokens using a valid refresh token.
 *
 * This route handler performs the following operations:
 * 1. Extracts the refresh token from the request parameters.
 * 2. Verifies the refresh token using the refresh token secret.
 * 3. Retrieves the user associated with the provided refresh token from the database.
 * 4. Generates new authentication tokens (access token and refresh token).
 * 5. Updates the user's refresh token in the database.
 * 6. Sends a response containing the new tokens.
 *
 * @param {Request} req - Express request object with the refresh token in the request parameters.
 * @param {Response} res - Express response object for sending responses.
 * @returns {void} - This route handler sends a response containing the new authentication tokens.
 */
const generateToken = catchAsync(async (req, res): Promise<void> => {
  const { refreshToken } = req.params;
  const refreshSecret = env.jwt.refreshTokenSecret;

  // Verify refresh token
  AuthService.verifyToken(refreshToken, refreshSecret);
  const existingUser = await UserService.getUser({
    refresh_token: refreshToken,
  }); // Get user from db
  // If user does not exist, throw an error
  if (!existingUser)
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Token");

  // Generate auth tokens
  const tokens: IApp.AuthTokens = AuthService.generateAuthTokens(
    existingUser.id,
    existingUser.role_details.name,
  );
  // Update refresh token
  await existingUser.$query().patch({ refresh_token: tokens.refresh_token });
  new ApiResponse({
    tokens,
  }).send(res);
});
export default {
  register,
  login,
  logout,
  generateToken,
};
