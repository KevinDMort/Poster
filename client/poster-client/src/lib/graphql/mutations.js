import { gql } from '@apollo/client';

export const createPostMutation = gql`
  mutation CreatePost($content: String!) {
    addPost(content: $content) {
      username
      content  
    }
  }
`;
export const createReplyMutation = gql`
  mutation($parentPostId: ID!, $content: String!) {
    addReply(parentPostID: $parentPostId, content: $content) {
      id
      username
      content
      createdAt
      replies {
        id
        username
      }
    }
  }`;
