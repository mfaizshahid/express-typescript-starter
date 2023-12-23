import { RoleModel, UserModel } from "@src/models";

export const AuthResponseKeys = [
  "email",
  "name",
  "id",
  "active",
  "created_at",
  "role_details",
  "refresh_token",
];

export interface UserWithRole extends UserModel {
  role_details: RoleModel;
}
