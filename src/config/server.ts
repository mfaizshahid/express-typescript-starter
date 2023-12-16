import Knex from "knex";
import env from "@/config/env";
import { Model } from "objection";

function pgConnect(): void {
  // Init knex
  const knex = Knex({
    client: "pg",
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
