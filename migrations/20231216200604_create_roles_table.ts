import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('roles', (t) => {
    t.increments('id').primary();
    t.string('name', 255).notNullable();
    t.string('description', 255);
    t.boolean('active').notNullable().defaultTo(true);
    t.timestamp('created_at', { useTz: false })
      .defaultTo(knex.fn.now())
      .notNullable();
    t.timestamp('updated_at', { useTz: false });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('roles');
}
