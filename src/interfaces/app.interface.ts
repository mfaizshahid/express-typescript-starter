import type Joi from 'joi';

export enum AppEnvTypes {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  STAGING = 'staging',
}

export enum AppRoles {
  ADMIN = 'admin',
  USER = 'user',
}

export interface EnvVariables {
  NODE_ENV: string;
  PORT: number;
  REDIS_URL: string;
  DB_URL: string;
  SITE_TITLE: string;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  ADMIN_ACCESS_TOKEN_SECRET: string;
  ADMIN_REFRESH_TOKEN_SECRET: string;
  SALT_ROUND: number;
  JWT_ACCESS_EXPIRATION_DAYS: string;
  JWT_REFRESH_EXPIRATION_DAYS: string;
  API_VERSION: number;
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD: string;
  MAIL_HOST: string;
  MAIL_PORT: number;
  MAIL_USER: string;
  MAIL_PASSWORD: string;
  MAIL_DEFAULT_EMAIL: string;
  MAIL_DEFAULT_NAME: string;
  EMAIL_VERIFICATION_TOKEN_SECRET: string;
  EMAIL_VERIFICATION_TOKEN_EXPIRES_IN_MINUTES: number;
  FORGOT_PASSWORD_TOKEN_SECRET: string;
  FORGOT_PASSWORD_TOKEN_EXPIRES_IN_MINUTES: number;
  FRONTEND_DOMAIN: string;
  BACKEND_DOMAIN: string;
}

export interface ExtendedError extends Error {
  statusCode: number;
}

export interface JoiSchema<T> {
  body?: Joi.ObjectSchema<T>;
  query?: Joi.ObjectSchema<T>;
  params?: Joi.ObjectSchema<T>;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export enum TokenTypes {
  EMAIL_VERIFICATION,
  FORGOT_PASSWORD,
}

export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  name?: string;
}
