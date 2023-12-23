import { IUser } from "@src/interfaces";
import { RoleModel, UserModel } from "@src/models";

/**
 * Get user from database by filter
 * @param filter {IUser.UserModelFilter} Filter to find user
 * @returns  {Promise<IUser.UserMode | undefinedl>} Promise with user
 */
const getUser = async (
  filter: IUser.UserModelFilter,
): Promise<UserModel | undefined> => {
  return await UserModel.query().findOne(filter);
};

/**
 * Create a new user
 * @param payload {IUser.RegisterUserPayload} - user details to register
 * @returns {Promise<UserModel>} - The newly created user object
 */
const createUser = async (
  payload: IUser.RegisterUserPayload,
): Promise<UserModel> => {
  return await UserModel.query()
    .insert(payload)
    .withGraphFetched("role_details");
};

/**
 * Get role from database by filter
 * @param filter {IUser.RoleModelFilter} Filter to find role
 * @returns  {Promise<IUser.RoleModel | undefined>} Promise with role
 */
const getRole = async (
  filter: IUser.RoleModelFilter,
): Promise<RoleModel | undefined> => {
  return await RoleModel.query().findOne(filter);
};
export default { getUser, createUser, getRole };
