import React, { useState } from 'react';
import { FaThumbsUp, FaUserCircle  } from 'react-icons/fa';
import '../styling/Post.css';

function Post({ post, onReply }) {
  const [liked, setLiked] = useState(false); // State to track whether the post has been liked

  const handleReplyClick = () => {
    onReply(post);
  };

  const handleLikeClick = () => {
    console.log("liked")
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

  return (
    <div className="post-container">
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
      <div className="interaction-container"> 
      <div className="post-actions">
        <button className="post-reply-button" onClick={handleReplyClick}>Reply</button>
      </div>
      <div className="post-like">
          <FaThumbsUp onClick={liked ? null : handleLikeClick} /> {/* Disable onClick if already liked */}
          <span>{post.likes}</span> {/* Display the number of likes */}
        </div>
      </div>
    </div>
  );
}

export default Post;
