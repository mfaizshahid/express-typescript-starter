export interface UserModelFilter {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  active?: boolean;
  role_id?: number;
  refresh_token?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface RoleModelFilter {
  id?: number;
  name?: string;
  description?: string;
  active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface RegisterUserPayload {
  email: string;
  password: string;
  name: string;
  role_id: string;
  active: boolean;
}

export const AuthResponseKeys = [
  "email",
  "name",
  "id",
  "active",
  "created_at",
  "role_details",
];
