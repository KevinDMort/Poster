import knex from 'knex';
import { v4 as uuidv4 } from 'uuid';

export const connection = knex({
    development: {
      client: 'sqlite3',
      connection: {
        filename: './poster.db'
      },
      useNullAsDefault: true
    }
  });

export function generateID()
{
  return uuidv4(); 

}