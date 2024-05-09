import { connection, generateID } from './connection';

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
        console.log('User added successfully.');
    } catch (error) {
        console.error('Error adding user:', error);
    }
    user.follows = null;
    return user;
}
