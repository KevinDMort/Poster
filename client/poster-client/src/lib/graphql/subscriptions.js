import { gql } from '@apollo/client';

export const MESSAGE_RECEIVED = gql`
  subscription OnMessageReceived($conversationID: String!) {
    messageReceived(conversationID: $conversationID) {
      id
      content
      senderName
      timestamp
    }
  }
`;