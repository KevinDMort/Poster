
import { generateID } from './connection.js';
import { getUsersFollowedByUserID } from './follow.js'
import moment from 'moment';
import { connection } from './connection.js';


export async function getPostDetails(postID) {
  return await getPostByID(postID);
}
// Function to fetch a single post by ID
async function getPostByID(postID) {
  try {
    const post = await connection('posts')
      .select('*')
      .where('id', postID)
      .first();

    return post || null;
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    throw new Error('Error fetching post');
  }
}

// Function to fetch replies for a given post ID
export async function getRepliesByPostID(postID) {
  try {
    const replies = await connection('posts')
      .select('*')
      .where({ parentPostID: postID });

    return replies;
  } catch (error) {
    console.error('Error fetching replies for post ID:', error);
    throw new Error('Error fetching replies');
  }
}



export async function calculateLikesCount(postID) {
  try {
    const likesCount = await connection('likes')
      .count('likes.postID as likesCount')
      .where({ postID })
      .first();

    return likesCount ? likesCount.likesCount : 0;
  } catch (error) {
    console.error('Error calculating likes count for post:', error);
    return 0;
  }
}

export async function getTimelinePosts(userId, offset, limit) {
  try {
    console.log('UserID:', userId);
    console.log('Offset:', offset);
    console.log('Limit:', limit);
    const followerUserIds = await getUsersFollowedByUserID(userId);
    const followedUserIds = followerUserIds.map(follower => follower.isFollowingID);

    const posts = await connection('posts')
      .select('posts.*')
      .whereIn('userID', followedUserIds)
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(limit);

    const postsWithReplies = await Promise.all(posts.map(async post => {
      const replies = await getRepliesByPostID(post.id);
      const repliesWithNestedReplies = await Promise.all(replies.map(async reply => {
        reply.replies = await getRepliesByPostID(reply.id);
        return reply;
      }));
      post.replies = repliesWithNestedReplies;
      return post;
    }));

    return postsWithReplies;
  } catch (error) {
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