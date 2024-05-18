import { useState } from 'react';
import Feed from '../components/Feed.js';
import Sidebar from '../components/Sidebar.js';
import '../styling/HomePage.css';
import CreatePost from '../components/CreatePost.js';
import { createPostMutation } from '../lib/graphql/mutations.js';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import UserHeader from '../components/UserHeader.js';

function HomePage({ onLogout }) {
  const navigate = useNavigate();
  const [createPost] = useMutation(createPostMutation); 
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  
  const handleReply = (post) => {
    navigate(`/reply/${post.id}`);
  };
  const handleCreatePost = () => {
    setShowCreatePostForm(true);
  };
  
  const handleCreatePostCancel = () => {
    setShowCreatePostForm(false);
  };
  const handleNewPostButtonClick = () => {
    handleCreatePost(); 
  };
  const handleCreatePostSubmit = (content) => {
    createPost({ variables: { content: content }})
      .then(() => {
        setShowCreatePostForm(false);
      })
      .catch((error) => {
        console.error('Error creating post:', error);
      });
  };
  
  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <div className="header-bar">
        <UserHeader />
        </div>
        <div className="buttons-container">
          <button className="new-post-button" onClick={handleNewPostButtonClick}>New Post</button>
          <button className="logout-button" onClick={onLogout}>Logout</button>
        </div>
        <div className="feed-container">
          {showCreatePostForm ? (
            <CreatePost onCancel={handleCreatePostCancel} onSubmit={handleCreatePostSubmit} />
          ) : (
            <Feed onReply={handleReply} onCreatePost={handleCreatePost} />
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
