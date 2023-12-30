import Knex from 'knex';
import { Model } from 'objection';

import env from '@/config/env';

function pgConnect(): void {
  // Init knex
  const knex = Knex({
    client: 'pg',
    connection: env.dbURL,
    pool: {
      min: 2,
      max: 10,
    },
  });

  Model.knex(knex);
}

export default {
  pgConnect,
};
