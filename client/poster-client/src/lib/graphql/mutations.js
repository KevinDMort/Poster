import { gql } from '@apollo/client';



export const createPostMutation = gql`
  mutation CreatePost($userId: ID!, $content: String!) {
    addPost(userID: $userId, content: $content) {
      username
      content  
    }
  }
`;
export const createReplyMutation = gql`mutation($userId: ID!, $parentPostId: ID!, $content: String!) {
  addReply(userID: $userId, parentPostID: $parentPostId, content: $content) {
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