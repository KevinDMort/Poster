import React, { useState } from 'react';
import { FaThumbsUp, FaUserCircle  } from 'react-icons/fa';
import '../styling/Post.css';
import { useNavigate } from 'react-router-dom'; 
import { createFollowMutation, createLikeMutation } from '../lib/graphql/mutations';
import { useMutation } from '@apollo/client';

function Post({ post, onReply }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const [addLike] = useMutation(createLikeMutation);
  const [addFollow] =useMutation(createFollowMutation);

  const handleReplyClick = () => {
    onReply(post);
  };

  const handleLikeClick = async () => {
    try {
      const { data } = await addLike({ variables: { postID: post.id } })
      setLiked(true);
    } catch (error) {
    console.error(error);
  }
  };
  const handleFollowClick = async () => {
    try {
      const { data } = await addFollow({ variables: { isFollowingID: post.userID }})
    } catch (error) {
    console.error(error);
  }
  };
  const getTimeSincePosted = () => {
    const currentTime = new Date();
    const postTime = new Date(post.createdAt);
    const diffInSeconds = Math.floor((currentTime - postTime) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minutes ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} days ago`;
    } 
  };

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  const handleUsernameClick = () => {
    console.log(post);
    navigate(`/user/${post.userID}`);
  };
  

  return ( 
    <div className="post-container" >
      
        <div onClick={handleUsernameClick} className="post-header">
          <FaUserCircle className="avatar-icon" />
          <p className="post-username">{post.username}</p>
        </div>
        <div onClick={handleClick}>
        <div className="post-content">
          <p>{post.content}</p>
        </div>
        <div className="post-footer">
          <p className="post-time">{getTimeSincePosted()}</p>
        </div>
        </div>
        <div className="interaction-container"> 
          <div className="post-actions">
            <button className="post-reply-button" onClick={handleReplyClick}>Reply</button>
            <button className="post-reply-button" onClick={handleFollowClick}>Follow</button>
          </div>

          <div className="post-like">
              <span className="likes-count">{post.likesCount}</span> 
              <FaThumbsUp onClick={liked ? null : handleLikeClick} /> 
              
          </div>
        </div>
    </div>
  );
}

export default Post;
