import type { IApp } from '@src/interfaces';
import dotenv from 'dotenv';
import Joi, { type ObjectSchema } from 'joi';

dotenv.config();
// Setting node env
process.env.NODE_ENV = process.env.NODE_ENV ?? 'development';

function loadEnvFile(): void {
  // Getting specific env file based on NODE_ENV
  const envFilePath = `.env.${process.env.NODE_ENV}`;
  const { error } = dotenv.config({ path: envFilePath });
  if (error != null) {
    throw new Error(`Could not load env file: ${error}`);
  }
}

/**
 *  Validates the schema for environment variables using Joi.
 *  @returns {EnvVariables} The validated environment variables object.
 *  @throws {Error} If any validation error occurs.
 */
function validateEnvSchema(): IApp.EnvVariables {
  /**
   * Defines the schema for the environment variables.
   * @type {ObjectSchema<EnvVariables>}
   */
  const envVarsSchema: ObjectSchema<IApp.EnvVariables> = Joi.object()
    .keys({
      NODE_ENV: Joi.string()
        .valid('production', 'staging', 'development')
        .required()
        .default('development'),
      PORT: Joi.number().required(),
      REDIS_URL: Joi.string().required().description('Redis DB URL'),
      DB_URL: Joi.string().required().description('Postgresql DB URL'),
      SITE_TITLE: Joi.string().required().description('App title'),
      ACCESS_TOKEN_SECRET: Joi.string()
        .required()
        .description('Access Token Secret'),
      REFRESH_TOKEN_SECRET: Joi.string()
        .required()
        .description('Refresh Token Secret'),
      ADMIN_ACCESS_TOKEN_SECRET: Joi.string()
        .required()
        .description('Admin Access Token Secret'),
      ADMIN_REFRESH_TOKEN_SECRET: Joi.string()
        .required()
        .description('Admin Refresh Token Secret'),
      SALT_ROUND: Joi.number().default(11),
      JWT_ACCESS_EXPIRATION_DAYS: Joi.number().default(2),
      JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30),
      API_VERSION: Joi.number().default(1),
      ADMIN_EMAIL: Joi.string().required().description('Admin email'),
      ADMIN_PASSWORD: Joi.string().required().description('Admin password'),
      MAIL_HOST: Joi.string()
        .description('Mail host')
        .default('mail.example.com'),
      MAIL_PORT: Joi.string().description('Mail port').default('25'),
      MAIL_USER: Joi.string().required().description('Mail user'),
      MAIL_PASSWORD: Joi.string().required().description('Mail password'),
      MAIL_DEFAULT_EMAIL: Joi.string()
        .description('Mail default email')
        .default('noreply@example.com'),
      MAIL_DEFAULT_NAME: Joi.string()
        .description('Mail default name')
        .default('No Reply'),
      EMAIL_VERIFICATION_TOKEN_SECRET: Joi.string().default(
        'email-verification-secret',
      ),
      EMAIL_VERIFICATION_TOKEN_EXPIRES_IN_MINUTES: Joi.number().default(60),
      FORGOT_PASSWORD_TOKEN_SECRET: Joi.string().default(
        'forgot-password-secret',
      ),
      FORGOT_PASSWORD_TOKEN_EXPIRES_IN_MINUTES: Joi.number().default(60),
    })
    .unknown();

  // Validate the environment variables against the schema
  const { value: EnvVariables, error } = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env);

  if (error != null) {
    throw new Error(`Config validation error: ${error.message}`);
  }
  return EnvVariables;
}

loadEnvFile();
const envVariables = validateEnvSchema();
export default {
  env: envVariables.NODE_ENV,
  port: envVariables.PORT,
  redisURL: envVariables.REDIS_URL,
  dbURL: envVariables.DB_URL,
  siteTitle: envVariables.SITE_TITLE,
  saltRounds: envVariables.SALT_ROUND,
  apiVersion: envVariables.API_VERSION,
  jwt: {
    accessTokenSecret: envVariables.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: envVariables.REFRESH_TOKEN_SECRET,
    adminAccessTokenSecret: envVariables.ADMIN_ACCESS_TOKEN_SECRET,
    adminRefreshTokenSecret: envVariables.ADMIN_REFRESH_TOKEN_SECRET,
    accessExpiration: envVariables.JWT_ACCESS_EXPIRATION_DAYS,
    refreshExpiration: envVariables.JWT_REFRESH_EXPIRATION_DAYS,
  },
  admin: {
    email: envVariables.ADMIN_EMAIL,
    password: envVariables.ADMIN_PASSWORD,
  },
  mail: {
    host: envVariables.MAIL_HOST,
    port: envVariables.MAIL_PORT,
    user: envVariables.MAIL_USER,
    password: envVariables.MAIL_PASSWORD,
    defaultEmail: envVariables.MAIL_DEFAULT_EMAIL,
    defaultName: envVariables.MAIL_DEFAULT_NAME,
  },
  emailVerification: {
    secret: envVariables.EMAIL_VERIFICATION_TOKEN_SECRET,
    expiresInMinutes: envVariables.EMAIL_VERIFICATION_TOKEN_EXPIRES_IN_MINUTES,
  },
  forgotPassword: {
    secret: envVariables.FORGOT_PASSWORD_TOKEN_SECRET,
    expiresInMinutes: envVariables.FORGOT_PASSWORD_TOKEN_EXPIRES_IN_MINUTES,
  },
};
