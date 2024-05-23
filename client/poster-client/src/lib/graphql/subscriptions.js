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

export const NEW_MESSAGE_RECEIVED = gql`
  subscription NewMessageReceived($receiverID: ID!) {
    newMessageReceived(receiverID: $receiverID) {
      id
      content
      senderID
      receiverID
      senderName
      receiverName
      timestamp
    }
  }
`;