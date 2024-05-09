import { connection } from './connection.js';

export async function getUsersFollowedByUserID(userID){
    try {
        const followers = await connection('follows').where({ isFollowingId: userID });
        return followers;
      } catch (error) {
        console.error('Error fetching followers by user ID:', error);
        return [];
      }

return [];    
}

export async function addFollow(userID,isFollowingID)
{
  try {
    await connection('follows').insert({
        userID,
        isFollowingID
    });
    console.log('Follow added successfully.');
} catch (error) {
    console.error('Error adding follow:', error);
}
}

export async function getFollowedUsers(userID) {
  try {
    const followedUsers = await connection('follows')
      .select('users.*')
      .leftJoin('users', 'follows.isFollowingID', 'users.id')
      .where('follows.UserID', userID);

    return followedUsers;
  } catch (error) {
    console.error('Error fetching followed users:', error);
    return [];
  }
}