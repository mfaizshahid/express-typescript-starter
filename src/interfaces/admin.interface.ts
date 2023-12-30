export enum UserActions {
  ACTIVATE = 'ACTIVATE',
  DEACTIVATE = 'DEACTIVATE',
  DELETE = 'DELETE',
}

export interface ActionUserRequestPayload {
  userId: number;
  action: UserActions;
}
