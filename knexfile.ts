import dotenv from 'dotenv';
import type { Knex } from 'knex';

// Setting node env
process.env.NODE_ENV = process.env.NODE_ENV ?? 'development';
// Getting specific env file based on NODE_ENV
const envFilePath = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envFilePath });

// Update with your config settings.

const config: Record<string, Knex.Config> = {
  development: {
    client: 'postgresql',
    connection: process.env.DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds/dev',
    },
  },

  staging: {
    client: 'postgresql',
    connection: process.env.DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds/staging',
    },
  },

  production: {
    client: 'postgresql',
    connection: process.env.DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds/production',
    },
  },
};

export default config;
