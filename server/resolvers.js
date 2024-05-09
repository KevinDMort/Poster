import {getPost, getTimeLine} from './db/posts.js'
import {getUser} from './db/users.js'

export const resolvers = {
    Query: {
      post: async (_root, { id }) => {
        try {
          return await getPost(id);
        } catch (error) {
          throw new Error(`Error fetching post: ${error}`);
        }
      },
      user: async (_root, { id }) => {
        try {
          return await getUser(id);
        } catch (error) {
          throw new Error(`Error fetching user: ${error}`);
        }
      },
      timeline: async (_root, {id}) => {
        try {
          return await getTimeLine(id);
        }
        catch (error){
          throw new error(`Error fetching timeline:'${error}`)
        }
      }
    }
  };