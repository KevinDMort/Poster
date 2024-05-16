import { useState } from 'react';
import Feed from '../components/Feed.js';
import HeadElement from '../components/HeadElement.js';
import Sidebar from '../components/Sidebar.js';
import '../styling/HomePage.css';
import CreatePost from '../components/CreatePost.js';
import { createPostMutation, createReplyMutation } from '../lib/graphql/mutations.js'; // Make sure to import createReplyMutation
import { useMutation } from '@apollo/client';

function HomePage() {
  const [createPost] = useMutation(createPostMutation);
  const [createReply] = useMutation(createReplyMutation); 
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const [replyToPost, setReplyToPost] = useState(null);
  
  const handleReply = (post) => {
    setReplyToPost(post);
    setShowCreatePostForm(true);
  };

  const handleCreatePost = () => {
    setReplyToPost(null);
    setShowCreatePostForm(true);
  };
  const handleNewPostButtonClick = () => {
    handleCreatePost(); 
  };
  const handleCreatePostCancel = () => {
    setShowCreatePostForm(false);
    setReplyToPost(null);
  };
  const handleCreatePostSubmit = (content) => {
    if (replyToPost !== null) {
      createReply({ variables: { userId: 7, parentPostId: replyToPost.id, content: content }})
        .then(() => {
          setShowCreatePostForm(false);
        })
        .catch((error) => {
          console.error('Error replying to post:', error);
        });
    } else {
      createPost({ variables: { userId: 7, content: content }})
        .then(() => {
          setShowCreatePostForm(false);
        })
        .catch((error) => {
          console.error('Error creating post:', error);
        });
    }
  };
  
  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <HeadElement replyToPost={replyToPost} />
        {!showCreatePostForm && !replyToPost && (
          <button onClick={handleNewPostButtonClick}>New Post</button>
        )}
        {showCreatePostForm ? (
          <CreatePost onCancel={handleCreatePostCancel} onSubmit={handleCreatePostSubmit} />
        ) : (
          <Feed onReply={handleReply} onCreatePost={handleCreatePost} />
        )}
      </div>
    </div>
  );
}

export default HomePage;
