import { useState, useEffect } from 'react';
import Feed from '../components/Feed.js';
import Sidebar from '../components/Sidebar.js';
import '../styling/HomePage.css';
import { createPostMutation } from '../lib/graphql/mutations.js';
import { useMutation, useSubscription } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import UserHeader from '../components/UserHeader.js';
import { getUser } from '../lib/auth.js';
import { NEW_MESSAGE_RECEIVED } from '../lib/graphql/subscriptions.js';
import CreatePost from '../components/CreatePost.js';

function HomePage({ onLogout }) {
  const navigate = useNavigate();
  const [createPost] = useMutation(createPostMutation);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const tokenUser = getUser();
  const userID = tokenUser?.id;

  const { data: newMessageData, error: newMessageError, loading: newMessageLoading } = useSubscription(NEW_MESSAGE_RECEIVED, {
    variables: { receiverID: userID },
  });

  useEffect(() => {
    if (newMessageError) {
      console.error('Subscription error:', newMessageError);
    }
    if (newMessageLoading) {
      console.log('Subscription loading...');
    }
    console.log('Subscription data:', newMessageData);

    if (newMessageData && newMessageData.newMessageReceived) {
      setShowNotification(true);
    }
  }, [newMessageData, newMessageError, newMessageLoading]);

  const handleCreatePost = () => {
    setShowCreatePostForm(true);
  };

  const handleCreatePostCancel = () => {
    setShowCreatePostForm(false);
  };

  const handleCreatePostSubmit = (content) => {
    createPost({ variables: { content: content } })
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
          <UserHeader userID={userID} />
        </div>
        <div className="buttons-container">
          <button className="new-post-button" onClick={handleCreatePost}>New Post</button>
          {showNotification && (
            <div className="notification">
              New Private Message Received!
            </div>
          )}
        </div>
        <div className="feed-container">
          {showCreatePostForm ? (
            <CreatePost onCancel={handleCreatePostCancel} onSubmit={handleCreatePostSubmit} />
          ) : (
            <Feed />
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
