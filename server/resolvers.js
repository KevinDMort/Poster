import { addPost, addReply, calculateLikesCount} from './db/posts.js'
import { addUser} from './db/users.js'
import { addLike } from './db/like.js'
import { addFollow } from './db/follow.js';
import { getPostDetails, getTimelinePosts, getExploreTimelinePosts} from './db/posts.js';
import { getUserByID, getNumberOfFollowers } from './db/users.js';
import {getFollowedUsers} from './db/follow.js'
import { PubSub } from 'graphql-subscriptions';
import {getMessageByConversationId, getMessagesByConversationId} from './db/messages.js'


const pubSub = new PubSub();

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
        return await getTimelinePosts(userId, offset, limit, context);
      } catch (error) {
        throw new Error(`Error fetching timeline: ${error}`);
      }
    },
    exploretimeline: async (_root, { limit, offset }, context ) => {
      try {
        return await getExploreTimelinePosts(offset, limit, context);
      } catch (error) {
        throw new Error(`Error fetching timeline: ${error}`);
      }
    },
    followingList: async (_root, _args, context) => {
      try {
        const userId = context.user.id;
        return await getFollowedUsers(userId);
      } catch (error) {
        throw new Error(`Error fetching following list: ${error}`);
      }
    },
    messages: async (_root, { conversationId }, _context) => {
      try {
        // Call the database function to fetch messages by conversation ID
        const messages = await getMessagesByConversationId(conversationId);
        return messages;
      } catch (error) {
        console.error('Error fetching messages by conversation ID:', error);
        throw new Error('Error fetching messages');
      }
    },
  },
  Mutation: {
    sendMessage: async (_root, {content, receiver, receiverID, sender}, { user }) => {
      const senderID = user.id;
      const timestamp = new Date().toISOString();
      const conversationId = [senderID, receiverID].sort().join('_');
      const message = {
        content,
        sender,
        senderID,
        receiver,
        receiverID,
        conversationId,
        timestamp,
      };
      const savedMessage = await saveMessageToDatabase(message);

      pubsub.publish(`MESSAGE_RECEIVED_${conversationId}`, { messageReceived: savedMessage }); // Notify the conversation
      pubsub.publish(`NEW_MESSAGE_RECEIVED_${receiverID}`, { newMessageReceived: savedMessage }); // Notify the receiver

      return savedMessage;
    },
    addPost: async (_root, {content }, context) => {
      try {
        const userID = context.user.id;
        return await addPost(userID, content);
      } catch (error) {
        throw new Error(`Error adding post: ${error}`);
      }
    },
    addReply: async (_root, {parentPostID, content }, context) => {
      try {
        const userID = context.user.id;
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
    addLike: async (_root, {postID}, context) => {
      try {
        const userID = context.user.id;
        console.log('USER ID' + userID)
        await addLike(userID, postID);
      } catch (error) {
        throw new Error(`Error adding like: ${error}`);
      }
    },
    addFollow: async (_root, {isFollowingID}, context) => {
      try {
        const userID = context.user.id;
        await addFollow(userID, isFollowingID);
      } catch (error) {
        throw new Error(`Error adding follow: ${error}`);
      }
    },
  },
  Subscription: {
    messageReceived: {
      subscribe: async (_root, { conversationId }, { user }) => {
        if (!user) {
          throw new Error('Unauthorized: You must be logged in to subscribe to messages.');
        }
        const message = await getMessageByConversationId(conversationId);
        if (!message || (message.senderID !== user.id && message.receiverID !== user.id)) {
          throw new Error('Unauthorized: You can only subscribe to messages you are involved in.');
        }
        return pubsub.asyncIterator(`MESSAGE_RECEIVED_${conversationId}`);
      },
    },
    newMessageReceived: {
      subscribe: (_root, { receiverID }, { user }) => {
        if (receiverID !== user.id) {
          throw new Error('Unauthorized: You can only subscribe to messages intended for you.');
        }
        // Subscribe to the specific receiverID event
        return pubsub.asyncIterator(`NEW_MESSAGE_RECEIVED_${receiverID}`);
      },
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
    replies: async (parent, _args, context) => {
      try {
        return await context.replyLoader.load(parent.id);
      } catch (error) {
        throw new Error(`Error fetching replies for post: ${error}`);
      }
    },
  },
  User: {
    follows: async (user) => {
      const followedUsers = await getFollowedUsers(user.id);
      return followedUsers;
    },
    followerCount: async(user) => {
      const followerCount = getNumberOfFollowers(user.id);
      return followerCount;
    }
  }
};
