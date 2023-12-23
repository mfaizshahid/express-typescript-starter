export enum UserActions {
  ACTIVATE = "ACTIVATE",
  DEACTIVATE = "DEACTIVATE",
  DELETE = "DELETE",
}

export interface ActionUserRequestPayload {
  user_id: number;
  action: UserActions;
}
