import { addPost, addReply, calculateLikesCount} from './db/posts.js'
import { addUser} from './db/users.js'
import { addLike } from './db/like.js'
import { addFollow } from './db/follow.js';
import { getPostDetails, getTimelinePosts, getRepliesByPostID} from './db/posts.js';
import { getUserByID } from './db/users.js';
import {getFollowedUsers} from './db/follow.js'

export const resolvers = {
  Query: {
    post: async (_root, { id }) => {
      try {
        return await getPostDetails(id);
      } catch (error) {
        throw new Error(`Error fetching post: ${error}`);
      }
    },
    user: async (_root, { id }) => {
      try {
        return await getUserByID(id);
      } catch (error) {
        throw new Error(`Error fetching user: ${error}`);
      }
    },
    timeline: async (_root, { limit, offset }, context ) => {
      try {
        const userId = context.user.id;
        return await getTimelinePosts(userId, offset, limit);
      } catch (error) {
        throw new Error(`Error fetching timeline: ${error}`);
      }
    }
  },
  Mutation: {
    addPost: async (_root, {content }, context) => {
      try {
        const userID = context.user.id;
        return await addPost(userID, content);
      } catch (error) {
        throw new Error(`Error adding post: ${error}`);
      }
    },
    addReply: async (_root, { userID, parentPostID, content }) => {
      try {
        return await addReply(userID, parentPostID, content);
      } catch (error) {
        throw new Error(`Error adding reply: ${error}`);
      }
    },
    addUser: async (_root, { username, password, email }) => {
      try {
        return await addUser(username, password, email);
      } catch (error) {
        throw new Error(`Error adding user: ${error}`);
      }
    },
    addLike: async (_root, { userID, postID }) => {
      try {
        await addLike(userID, postID);
      } catch (error) {
        throw new Error(`Error adding like: ${error}`);
      }
    },
    addFollow: async (_root, { followerUserID, followingUserID }) => {
      try {
        await addFollow(followerUserID, followingUserID);
      } catch (error) {
        throw new Error(`Error adding follow: ${error}`);
      }
    },
  },
  Post: {
    likesCount: async (post) => {
      try {
        const likes = await calculateLikesCount(post.id);
        return likes;
      } catch (error) {
        console.error('Error fetching likes for post:', error);
        return 0;
      }
    },
    username: async (parent) => {
      try {
      
        const user = await getUserByID(parent.userID);
        return user.username;
      } catch (error) {
        console.error('Error fetching username for post:', error);
        return null;
      }
    },
    replies: async (parent) => {
      try {
        return await getRepliesByPostID(parent.id);
      } catch (error) {
        throw new Error(`Error fetching replies for post: ${error}`);
      }
    },
  },
  User: {
    follows: async (user) => {
      const followedUsers = await getFollowedUsers(user.id);
      return followedUsers;
    }
  }
};
