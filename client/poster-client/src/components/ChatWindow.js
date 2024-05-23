import React, { useState, useEffect } from 'react';
import { useMutation, useSubscription } from '@apollo/client';
import MessageInput from './MessageInput';
import { useGetMessages } from '../lib/graphql/hook.js';
import { MESSAGE_RECEIVED } from '../lib/graphql/subscriptions.js';
import { SEND_MESSAGE } from '../lib/graphql/mutations.js';
import { getUser } from '../lib/auth.js';
import { formatDistanceToNow } from 'date-fns';
import '../styling/ChatWindow.css'; // Make sure to create and import this CSS file

const ChatWindow = ({ chatId }) => {
  const currentUser = getUser();
  const currentUserID = currentUser.id;
  const { loading, error, data, refetch } = useGetMessages(chatId);
  const { data: subscriptionData } = useSubscription(MESSAGE_RECEIVED, {
    variables: { conversationID: chatId },
  });
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (data && data.messages) {
      setMessages(data.messages);
    }
  }, [data]);

  useEffect(() => {
    if (subscriptionData && subscriptionData.messageReceived) {
      setMessages(prevMessages => [...prevMessages, subscriptionData.messageReceived]);
    }
  }, [subscriptionData]);

  const handleSendMessage = async (content) => {
    let receiverID, senderID, receiverName, senderName;
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.senderID === currentUserID) {
        receiverID = lastMessage.receiverID;
        receiverName = lastMessage.receiverName;
        senderName = currentUser.username;  // Ensure senderName is the current user's username
      } else {
        receiverID = lastMessage.senderID;
        receiverName = lastMessage.senderName;
        senderName = currentUser.username;  // Ensure senderName is the current user's username
      }
    } else {
      // Handle case where there are no previous messages
      // For now, you can set default values or handle as needed
      receiverID = ''; // Set appropriate default or handle accordingly
      receiverName = ''; // Set appropriate default or handle accordingly
      senderName = currentUser.username;
    }
    try {
      await sendMessage({
        variables: { content, receiverName, receiverID, senderName },
      });
      refetch();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error has occurred</div>;
  }

  return (
    <div className="chat-window-container">
      <div className="messages-container">
        {messages &&
          messages.map(message => (
            <div
              key={message.id}
              className={`message-item ${
                message.senderID === currentUserID ? 'message-sent' : 'message-received'
              }`}
            >
              <div className="message-content">
                <strong>{message.senderName ? message.senderName : 'Unknown'}:</strong> {message.content}
              </div>
              <div className="message-timestamp">
                {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
              </div>
            </div>
          ))}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
