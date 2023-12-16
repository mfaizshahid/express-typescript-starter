import { Model } from "objection";

export class BaseModel extends Model {
  static get modelPaths() {
    return [__dirname];
  }
}
