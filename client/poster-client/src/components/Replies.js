import React from 'react';
import Post from './Post'; // Import the Post component

function Replies({ post }) {
  // Assuming post.replies is an array containing reply objects
  const { replies } = post;
  console.log(replies)

  if (!replies || replies.length === 0) {
    return <div>No replies yet.</div>;
  }

  return (
    <div>
      <h2>Replies</h2>
      {replies.map((reply) => (
        <Post key={reply.id} post={reply} />
      ))}
    </div>
  );
}

export default Replies;
