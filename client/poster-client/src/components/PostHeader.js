import React from 'react';

function PostHeader({ post }) {
  return (
    <div>
      <h1>{post.username}'s Post</h1>
      <p>Content: {post.content}</p>
      <p>Created At: {post.createdAt}</p>
    </div>
  );
}

export default PostHeader;
