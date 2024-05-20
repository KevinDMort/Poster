import knex from 'knex';
import { v4 as uuidv4 } from 'uuid';

export const connection = knex({
  client: 'sqlite3', // Specify the SQL database client
  connection: {
    filename: './poster.db'
  },
  useNullAsDefault: true,
});

export function generateID()
{
  return uuidv4(); 

}