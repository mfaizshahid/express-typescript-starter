import { BaseModel } from "@/models/base.model";
import { ModelObject, PartialModelObject } from "objection";
import { IApp } from "@src/interfaces";

export class RoleModel extends BaseModel {
  static tableName = "roles";

  id!: number;
  name!: IApp.AppRoles;
  description?: string | null;
  active!: boolean;
  created_at!: Date;
  updated_at?: Date | null;

  $beforeInsert(): void {
    this.created_at = new Date();
  }

  $beforeUpdate(): void {
    this.updated_at = new Date();
  }
}

export type RoleShape = PartialModelObject<RoleModel>; // Object type with optional properties
export type RoleShapeExact = ModelObject<RoleModel>; // Object type with original properties
