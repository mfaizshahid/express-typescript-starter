import { genSalt, hash } from 'bcrypt';
import type { Knex } from 'knex';

import env from '../../src/config/env';
import { AppRoles } from '../../src/interfaces/app.interface';

export async function seed(knex: Knex): Promise<void> {
  // Deletes all existing entries
  await knex('users').del();
  // Password generating
  const salt: string = await genSalt(env.saltRounds);
  const password = await hash(env.admin.password, salt);
  const adminRole = await knex('roles').where({ name: AppRoles.ADMIN }).first();
  if (!adminRole) throw new Error('Admin role not found');
  // Inserts seed entries
  await knex('users').insert([
    {
      name: 'Admin',
      email: env.admin.email,
      password,
      active: true,
      role_id: adminRole.id,
    },
  ]);
}
