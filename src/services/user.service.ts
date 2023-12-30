import type { UserWithRole } from '@src/interfaces/user.interface';
import type { RoleShape, UserShape } from '@src/models';
import { RoleModel, UserModel } from '@src/models';

/**
 * Get user from database by filter
 * @param filter {UserShape} Filter to find user
 * @returns  {Promise<UserWithRole | undefined>} Promise with user
 */
const getUser = async (
  filter: UserShape,
): Promise<UserWithRole | undefined> => {
  const query = await UserModel.query()
    .findOne(filter)
    .withGraphFetched('role_details');
  return query as UserWithRole;
};

/**
 * Update user from database by filter
 * @param filter {UserShape} Filter to find user
 * @returns  {Promise<UserWithRole | undefined>} Promise with user
 */
const updateUser = async (
  id: number,
  payload: UserShape,
): Promise<UserModel | undefined> => {
  return UserModel.query()
    .patchAndFetchById(id, payload)
    .withGraphFetched('role_details');
};
/**
 * Create a new user
 * @param payload {UserShape} - user details to register
 * @returns {Promise<UserWithRole>} - The newly created user object
 */
const createUser = async (payload: UserShape): Promise<UserModel> => {
  return UserModel.query().insert(payload).withGraphFetched('role_details');
};

/**
 * Get role from database by filter
 * @param filter {RoleShape} Filter to find role
 * @returns  {Promise<IUser.RoleModel | undefined>} Promise with role
 */
const getRole = async (filter: RoleShape): Promise<RoleModel | undefined> => {
  return RoleModel.query().findOne(filter);
};
export default { getUser, createUser, getRole, updateUser };
