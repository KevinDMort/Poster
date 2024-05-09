
import { getFollowUserIds } from './users.js'

export async function getPost(id)
{
    return {
        id: id,
        userID: '1',
        content: "Test post",
        createdAt: "09-05-2024",
        likes: [{ id: `${id}`, username: "Test", password: "Test password", email: "Test@me.com" }],
        replies: [], // Empty array instead of [{}]
        parentPost: null
    }
}

export async function getTimeLine(id){

    const userIds= await getFollowUserIds(id);
    
    // retrieve posts

    return []; 

}

