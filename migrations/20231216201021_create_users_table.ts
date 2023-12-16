import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (t) => {
    t.increments("id").primary();
    t.string("email", 255).notNullable().unique();
    t.string("name").notNullable();
    t.specificType("password", "varchar").notNullable();
    t.boolean("active").notNullable().defaultTo(false);
    t.integer("role_id")
      .references("id")
      .inTable("roles")
      .onDelete("SET NULL")
      .onUpdate("CASCADE");
    t.timestamp("created_at", { useTz: false })
      .defaultTo(knex.fn.now())
      .notNullable();
    t.specificType("refresh_token", "varchar").notNullable();
    t.timestamp("updated_at", { useTz: false });
    t.timestamp("deleted_at", { useTz: false });
  });
}

export async function down(knex: Knex): Promise<void> {}
