import React, { useState } from 'react';
import { FaThumbsUp, FaUserCircle  } from 'react-icons/fa';
import '../styling/Post.css';
import { useNavigate } from 'react-router-dom'; 

function Post({ post, onReply }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const handleReplyClick = () => {
    onReply(post);
  };

  const handleLikeClick = () => {
    setLiked(true);
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

  return ( 
    <div className="post-container" >
      <div onClick={handleClick}>
        <div className="post-header">
          <FaUserCircle className="avatar-icon" />
          <p className="post-username">{post.username}</p>
        </div>
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
          </div>
          <div className="post-like">
              <FaThumbsUp onClick={liked ? null : handleLikeClick} /> 
              <span>{post.likes}</span> 
          </div>
        </div>
    </div>
  );
}

export default Post;
