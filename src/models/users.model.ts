import { BaseModel } from "@/models/base.model";
import { ModelObject, PartialModelObject } from "objection";
export class UserModel extends BaseModel {
  static tableName = "users";

  id!: number;
  name!: string;
  email!: string;
  password!: string;
  active!: boolean;
  role_id!: number;
  refresh_token?: string;
  created_at!: Date;
  updated_at?: Date;
  deleted_at?: Date;

  $beforeInsert(): void {
    this.created_at = new Date();
  }

  $beforeUpdate(): void {
    this.updated_at = new Date();
  }

  static relationMappings = {
    role_details: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: "roles.model",
      join: {
        from: "users.role_id",
        to: "roles.id",
      },
    },
  };
}

export type UserShape = PartialModelObject<UserModel>; // Object type with optional properties
export type UserShapeExact = ModelObject<UserModel>; // Object type with original properties
