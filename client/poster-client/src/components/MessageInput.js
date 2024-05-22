import React, { useState } from 'react';

const MessageInput = (onSendMessage) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() !== '') {
      // Pass senderName, receiverName, and receiverID along with content
      onSendMessage(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '10px', borderTop: '1px solid #ddd' }}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message..."
        style={{ width: '100%', padding: '10px' }}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput;
