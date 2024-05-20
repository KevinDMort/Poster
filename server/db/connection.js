import knex from 'knex';
import { v4 as uuidv4 } from 'uuid';

export const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: './poster.db'
  },
  useNullAsDefault: true,
  debug: true // Enable debugging
});

connection.on('query', (query) => {
  console.log('SQL Query:', query.sql);
  console.log('Bindings:', query.bindings);
});
export function generateID()
{
  return uuidv4(); 

}