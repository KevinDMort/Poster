import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styling/Post.css';

function Post({ post, onReply }) {
  const formattedDate = new Date(post.createdAt).toLocaleString();

  const handleReplyClick = () => {
    onReply(post);
  };

  return (
    <div className="post-container">
      <p className="post-username">User: {post.username}</p>
      <p className="post-content">Post: {post.content}</p>
      <p className="post-created-at">Posted: {formattedDate}</p>
      <p className="post-replies">Replies: {post.replies.length}</p>
      {/* Render "Reply" button */}
      <button onClick={handleReplyClick}>Reply</button>
      {/* Conditionally render "See Replies" button if post has replies */}
      {post.hasReplies && (
        <Link to={`/posts/${post.id}`}>
          <button>See Replies</button>
        </Link>
      )}
    </div>
  );
}

export default Post;
