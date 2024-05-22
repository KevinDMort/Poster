import React, { useState } from 'react';
import Post from '../components/Post.js';
import CreatePost from '../components/CreatePost.js';
import Modal from '../components/Modal.js';
import { useTimeline } from '../lib/graphql/hook.js';
import { createReplyMutation } from '../lib/graphql/mutations.js';
import { useMutation } from '@apollo/client';
import '../styling/HomePage.css'

const POSTS_PER_PAGE = 4;

function Feed({ onReply }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [createReply] = useMutation(createReplyMutation);
  const [replyingTo, setReplyingTo] = useState(null); // Track the post being replied to
  const {timeline, loading, error } = useTimeline(POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const handleReply = (post) => {
    setReplyingTo(post);
  };

  const handleCancel = () => {
    setReplyingTo(null);
  };

  const handleSubmit = (content) => {
    if (replyingTo) {
      createReply({ variables: { content: content, parentPostId: replyingTo }})
        .then(() => {
          console.log(`Reply to post ${replyingTo}:`, content);
          setReplyingTo(null); 
        })
        .catch((error) => {
          console.error('Error creating reply:', error);
        });
    }
  };
  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };
  const handleLoadLess = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error has occurred</div>;
  }
  return (
    <div>
      {timeline.map((post) => (
        <div key={post.id}>
          <Post post={post} onReply={() => handleReply(post.id)} />
        </div>
      ))}
      <div className="button-container">
        {currentPage > 0 && (
          <button className="navigation-button" onClick={handleLoadLess}>Go Back</button>
        )}
        {timeline.length === POSTS_PER_PAGE && (
          <button className="navigation-button" onClick={handleLoadMore}>Load More</button>
        )}
      </div>
      <Modal isOpen={!!replyingTo} onClose={handleCancel}>
        <CreatePost
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
}

export default Feed;
