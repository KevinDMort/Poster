
import { generateID } from './connection.js';
import { getUsersFollowedByUserID } from './follow.js'
import moment from 'moment';
import { connection } from './connection.js';
import DataLoader from 'dataloader';

export const createReplyLoader = () => new DataLoader(async (postIds) => {
  const replies = await getRepliesByPostID(postIds);
  const replyMap = replies.reduce((acc, reply) => {
    if (!acc[reply.parentPostID]) {
      acc[reply.parentPostID] = [];
    }
    acc[reply.parentPostID].push(reply);
    return acc;
  }, {});
  return postIds.map(id => replyMap[id] || []);
});

export async function getPostDetails(postID) {
  return await getPostByID(postID);
}
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
export async function getPostsByUser(userID, limit, offset) {
  try {
    const posts = await connection('posts')
      .select('*')
      .where('userID', userID)
      .limit(limit)
      .offset(offset);
    return posts;
  } catch (error) {
    console.error('Error fetching posts by user ID:', error);
    throw new Error('Error fetching posts');
  }
}

export async function getRepliesByPostID(postID) {
  try {
    const replies = await connection('posts')
      .select('*')
      .whereIn('parentPostID', postID);
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

export async function getTimelinePosts(userId, offset, limit, context) {
  try {
    const followerUserIds = await getUsersFollowedByUserID(userId);
    const followedUserIds = [userId, ...followerUserIds.map(follower => follower.isFollowingID)];

    const posts = await connection('posts')
      .select('posts.*')
      .whereIn('userID', followedUserIds)
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(limit);

      const postsWithReplies = await Promise.all(posts.map(async post => {
        const replies = await context.replyLoader.load(post.id);
        const repliesWithNestedReplies = await Promise.all(replies.map(async reply => {
          reply.replies = await context.replyLoader.load(reply.id);
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
    return post; 
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
  } catch (error) {
      console.error('Error adding reply:', error);
  }
  return reply;
}

export async function getExploreTimelinePosts(offset, limit, context) {
  try {
    const posts = await connection('posts')
      .select('posts.*')
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(limit);

      const postsWithReplies = await Promise.all(posts.map(async post => {
        const replies = await context.replyLoader.load(post.id);
        const repliesWithNestedReplies = await Promise.all(replies.map(async reply => {
          reply.replies = await context.replyLoader.load(reply.id);
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