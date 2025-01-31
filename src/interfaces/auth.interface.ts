import type { IApp } from '.';

export interface RegisterRequestPayload {
  password: string;
  email: string;
  name: string;
}

export interface LoginRequestPayload {
  password: string;
  email: string;
}

export interface GenerateTokenRequestPayload {
  refresh_token: string;
}

export interface GenerateTokenOptionalParams {
  tokenType?: IApp.TokenTypes;
  tokenVersion?: number;
}

export interface UserRegisteredTemplatePayload {
  link: string;
  expiryTime: string;
  username: string;
}
