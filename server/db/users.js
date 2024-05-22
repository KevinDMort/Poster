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
  export async function addUser(username, password, email, location, description) {
    const user = {
        id: generateID(),
        username,
        password,
        email,
        location, 
        description
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

export async function getNumberOfFollowers(userID){
  try {
    const result = await connection('follows')
    .count('userID as followerCount')
    .where({ isFollowingID: userID })
    .first();
    return result ? result.followerCount : 0;
  } catch (error) {
    console.error('Error calculating likes count for post:', error);
    return 0;
  }
}
