export interface RegisterRequestPayload {
  password: string;
  email: string;
  name: string;
  rolename: string;
}

export interface LoginRequestPayload {
  password: string;
  email: string;
}

export interface GenerateTokenRequestPayload {
  refresh_token: string;
}
