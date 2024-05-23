import React, { useState } from 'react';
import CreatePost from '../components/CreatePost.js';
import Modal from '../components/Modal.js';
import { createReplyMutation } from '../lib/graphql/mutations.js';
import { useMutation } from '@apollo/client';

const ReplyHandler = ({ children }) => {
  const [createReply] = useMutation(createReplyMutation);
  const [replyingTo, setReplyingTo] = useState(null);

  const handleReply = (post) => {
    setReplyingTo(post);
  };

  const handleCancel = () => {
    setReplyingTo(null);
  };

  const handleSubmit = (content) => {
    if (replyingTo) {
      createReply({ variables: { content: content, parentPostId: replyingTo } })
        .then(() => {
          console.log(`Reply to post ${replyingTo}:`, content);
          setReplyingTo(null);
        })
        .catch((error) => {
          console.error('Error creating reply:', error);
        });
    }
  };

  return (
    <>
      {React.cloneElement(children, { onReply: handleReply })}
      <Modal isOpen={!!replyingTo} onClose={handleCancel}>
        <CreatePost onCancel={handleCancel} onSubmit={handleSubmit} />
      </Modal>
    </>
  );
};

export default ReplyHandler;
