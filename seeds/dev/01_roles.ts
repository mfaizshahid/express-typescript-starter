import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes all existing entries
  await knex('roles').del();

  // Inserts seed entries
  await knex('roles').insert([{ name: 'admin' }, { name: 'user' }]);
}
