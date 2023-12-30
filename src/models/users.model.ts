import type { ModelObject, PartialModelObject } from 'objection';

import { BaseModel } from '@/models/base.model';

export class UserModel extends BaseModel {
  static tableName = 'users';

  id!: number;

  name!: string;

  email!: string;

  password!: string;

  active!: boolean;

  role_id!: number;

  refresh_token?: string | null;

  created_at!: Date;

  updated_at?: Date | null;

  deleted_at?: Date | null;

  $beforeInsert(): void {
    this.created_at = new Date();
  }

  $beforeUpdate(): void {
    this.updated_at = new Date();
  }

  static relationMappings = {
    role_details: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: 'roles.model',
      join: {
        from: 'users.role_id',
        to: 'roles.id',
      },
    },
  };
}

export type UserShape = PartialModelObject<UserModel>; // Object type with optional properties
export type UserShapeExact = ModelObject<UserModel>; // Object type with original properties
