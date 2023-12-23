import { UserService } from "@src/services";
import { ApiError, ApiResponse, catchAsync } from "@src/utils";
import httpStatus from "http-status";

/**
 * Controller function for performing actions on a user by an admin user.
 *
 * This function performs the following operations:
 * 1. Extracts the `user_id` and `action` from the request body.
 * 2. Retrieves the user based on the `user_id` from the database.
 * 3. Performs the specified action (activate, deactivate, or delete) on the user.
 * 4. Sends a response indicating the success of the action.
 *
 * @param {Request} req - Express request object with the incoming data.
 * @param {Response} res - Express response object for sending the action result.
 * @returns {Promise<void>} - Promise indicating the completion of the controller function.
 *
 * Note: This controller allows admin users to perform actions on a user account based on the specified action (e.g., activation, deactivation, deletion).
 */
const actionUser = catchAsync(async (req, res): Promise<void> => {
  const { user_id, action } = req.body;
  const user = await UserService.getUser({ id: user_id });

  // If user not exists, throw an error
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, "User not found");

  // Operation based on action
  switch (action) {
    case "ACTIVATE":
      await user.$query().patch({ active: true, deleted_at: null });
      break;
    case "DEACTIVATE":
      await user.$query().patch({ active: false });
      break;
    case "DELETE":
      await user.$query().patch({ active: false, deleted_at: new Date() });
      break;
  }
  new ApiResponse({}, `User ${user.name} ${action} successfully`).send(res);
});

export default {
  actionUser,
};
