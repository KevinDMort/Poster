import React from 'react';
import '../styling/Post.css';

function Post({ post }) {
 
  const formattedDate = new Date(post.createdAt).toLocaleString();

  return (
    <div className="post-container">
      <p className="post-username">User: {post.username}</p>
      <p className="post-content">Post: {post.content}</p>
      <p className="post-created-at">Posted: {formattedDate}</p>
    </div>
  );
}

export default Post;
