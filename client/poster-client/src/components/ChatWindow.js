import React, { useState, useEffect } from 'react';
import { useMutation, useSubscription } from '@apollo/client';
import MessageInput from './MessageInput';
import { useGetMessages } from '../lib/graphql/hook.js';
import { MESSAGE_RECEIVED } from '../lib/graphql/subscriptions.js';
import {SEND_MESSAGE} from '../lib/graphql/mutations.js'


const ChatWindow = ({ chatId }) => {
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
    // Assume you have receiver and sender information available
    const receiverName = 'receiver_username';
    const receiverID = 'receiver_id';
    const senderName = 'sender_username';

    await sendMessage({
      variables: { content, receiverName, receiverID, senderName },
    });

    refetch();
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error has occurred</div>;
  }

  console.log('HERE', messages);
  return (
    <div>
      {messages &&
        messages.map(message => (
          <div key={message.id} style={{ padding: '10px' }}>
            <div>
              <strong>{message.senderName ? message.senderName : 'Unknown'}:</strong> {message.content}
            </div>
            <div style={{ fontSize: '0.8em', color: '#666' }}>{message.timestamp}</div>
          </div>
        ))}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;