import React, { useState, useEffect, useRef } from 'react';
import Post from '../components/Post.js';
import CreatePost from '../components/CreatePost.js';
import Modal from '../components/Modal.js';
import { useExploreTimeline } from '../lib/graphql/hook.js';
import { createReplyMutation } from '../lib/graphql/mutations.js';
import { useMutation } from '@apollo/client';
import '../styling/HomePage.css'
import Sidebar from '../components/Sidebar.js';

const POSTS_PER_PAGE = 4;

function ExplorePage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [createReply] = useMutation(createReplyMutation);
  const [replyingTo, setReplyingTo] = useState(null); // Track the post being replied to
  const {exploretimeline, loading, error } = useExploreTimeline(POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);


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
    return <div>Error: {error.message}</div>;
  }
  if (!exploretimeline) {
    return <div>No data available.</div>;
  }

  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
      {exploretimeline.map((post) => (
        <div key={post.id}>
          <Post post={post} onReply={() => handleReply(post.id)} />
        </div>
      ))}
      <div className="button-container">
        {currentPage > 0 && (
          <button className="navigation-button" onClick={handleLoadLess}>Go Back</button>
        )}
        {exploretimeline.length === POSTS_PER_PAGE && (
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
    </div>
  );
}

export default ExplorePage;
