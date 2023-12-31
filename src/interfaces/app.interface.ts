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
