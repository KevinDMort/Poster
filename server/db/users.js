import { connection, generateID } from './connection.js';

export async function getUserByID(id) {
    try {
      const user = await connection('users').first().where({ id });
      return user;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      return null;
    }
  }
  export async function addUser(username, password, email) {
    const user = {
        id: generateID(),
        username,
        password,
        email
    }
    try {
        await connection('users').insert(user);
    } catch (error) {
        console.error('Error adding user:', error);
    }
    user.follows = null;
    return user;
}
export async function getUserByEmail(email) {
  try {
    const user = await connection('users').first().where({ email });
    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return null;
  }
}
export async function getUserByUsername(username) {
  try {
    const user = await connection('users').first().where({ username });
    return user;
  } catch (error) {
    console.error('Error fetching user by username:', error);
    return null;
  }

}
