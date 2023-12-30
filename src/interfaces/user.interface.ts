import type { RoleModel, UserModel } from '@src/models';

export const AuthResponseKeys = [
  'email',
  'name',
  'id',
  'active',
  'created_at',
  'role_details',
];

export interface UserWithRole extends UserModel {
  role_details: RoleModel;
}
