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

export const createLikeMutation = gql`
  mutation addLike($postID: ID!) {
    addLike(postID: $postID)
  }
`;

export const createFollowMutation = gql`
  mutation addFollow($isFollowingID: ID!) {
    addFollow(isFollowingID: $isFollowingID)
  }
`;
