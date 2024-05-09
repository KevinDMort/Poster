import { connection } from './connection';

export async function addLike(userID, postID) {
    try {
        await connection('likes').insert({
            userID,
            postID
        });
        console.log('Like added successfully.');
    } catch (error) {
        console.error('Error adding like:', error);
    }
}