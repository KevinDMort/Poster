
import { generateID } from './connection.js';
import { getUsersFollowedByUserID } from './follow.js'
import moment from 'moment';


export async function getPostDetails(postID, offset, limit) {
  try {
    const post = await connection('posts')
      .select('*')
      .where('id', postID)
      .first();

    if (!post) {
      return null;
    }

    if (!post.parentPostID) {
      const replies = await connection('posts')
        .select('*')
        .where({ parentPostID: postID })
        .offset(offset)
        .limit(limit);

      post.replies = await Promise.all(replies.map(async (reply) => {
        return getPostDetails(reply.id);
      }));
    }

    return post;
  } catch (error) {
    console.error('Error fetching post details by ID:', error);
    return null;
  }
}
export async function calculateLikesCount(postID) {
  try {
    const likesCount = await connection('likes')
      .count('id as likesCount')
      .where({ postID })
      .first();

    return likesCount ? likesCount.likesCount : 0;
  } catch (error) {
    console.error('Error calculating likes count for post:', error);
    return 0;
  }
}

export async function getTimelinePosts(userId, offset, limit){
    try {
        const followerUserIds = await getUsersFollowedByUserID(userId);
        const followeeIDs = followerUserIds.map((follower) => follower.followeeID);
        
        const posts = await connection('posts')
            .select('posts.*')
            .count('likes.id as likesCount')
            .leftJoin('likes', 'posts.id', 'likes.postID')
            .whereIn('userID', followeeIDs)
            .orderBy('createdAt', 'desc')
            .groupBy('posts.id')
            .offset(offset)
            .limit(limit);
            return posts;}
            catch (error){
            console.error('Error fetching timeline posts:', error);
            return [];
          }
}
export async function addPost(userID, content) {
  const createdAt = moment().format();
  const post = {
    id: generateID(),
    userID,
    content,
    createdAt,
  };

  try {
    await connection('posts').insert(post);
    console.log('Post added successfully.');
    return post; // Return the added post object
  } catch (error) {
    console.error('Error adding post:', error);
    throw new Error('Error adding post');
  }
}
export async function addReply(userID, parentPostID, content) {
  const createdAt = moment().format(); 
  const reply= {
    id:generateID(),
    userID,
    content,
    createdAt,
    parentPostID
  }
  
  try {
      await connection('posts').insert(reply);
      console.log('Reply added successfully.');
  } catch (error) {
      console.error('Error adding reply:', error);
  }
  return reply;
}