import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserDetails } from '../lib/graphql/hook';
import Sidebar from '../components/Sidebar'
import UserHeader from '../components/UserHeader';
import '../styling/HomePage.css';
import { SEND_MESSAGE } from '../lib/graphql/mutations';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { getUser } from '../lib/auth';
import { createFollowMutation } from '../lib/graphql/mutations';
import Post from '../components/Post.js';
import {useUserPostHistory} from '../lib/graphql/hook.js'

function UserProfile() {
  const { id } = useParams();
  const { user, loading, error } = useUserDetails(id);
  const navigate = useNavigate();
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const currentUser = getUser();
  const currentUserID = currentUser.id;
  const { user: currentUserData, loading: currentUserLoading, error: currentUserError } = useUserDetails(currentUserID);
  const [addFollow] =useMutation(createFollowMutation);
  const { posts, postloading, posterror } = useUserPostHistory(id, 4, 0);

  const handleStartChat = async () => {
    try {
      const receiverID = id;
      const receiverName = user.username;
      const senderName = currentUserData.username;
      const initialMessageContent = 'Chat started'; // Or an empty string if appropriate

      const { data } = await sendMessage({
        variables: { content: initialMessageContent, receiverID, receiverName, senderName },
      });

      const chatId = data.sendMessage.chatId; // Assuming your mutation returns a chatId
      navigate(`/chat`);
    } catch (err) {
      console.error('Error starting chat:', err);
    }
  };

  const handleReply = (post) => {
    console.log('Reply to post:', post);
    navigate(`/post/${post.id}`);
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }
  const handleFollowClick = async () => {
    try {
      const { data } = await addFollow({ variables: { isFollowingID: user.id }})
    } catch (error) {
    console.error(error);
  }
  };

  return (
    <div className="container">
      <Sidebar/>
      <div className="main-content">
        <div className="header-bar">
          <UserHeader userID={user.id}/>
        </div>
        <button className="navigation-button" onClick={handleStartChat}>Start Chat</button>
        <button className="navigation-button" onClick={handleFollowClick}>Follow</button>
        
        <div className="posts-container">
          {posts.map(post => (
        <Post key={post.id} post={post} onReply={handleReply} />
        ))}

        </div>
      </div>
      
    </div>
  );
}

export default UserProfile;
