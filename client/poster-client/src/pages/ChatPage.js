// src/components/ChatPage.js
import React, { useState } from 'react';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import Sidebar from '../components/Sidebar';
import '../styling/ChatPage.css';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="ChatPageContainer">
      <Sidebar />
      <div className="ChatListContainer">
        <ChatList onSelectChat={setSelectedChat} />
      </div>
      <div className="ChatWindowContainer">
        {selectedChat ? (
          <ChatWindow chatId={selectedChat.id} />
        ) : (
          <div className="SelectChatMessage">Select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
