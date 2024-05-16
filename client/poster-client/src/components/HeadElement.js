import React from 'react';
import { useUserDetails } from '../lib/graphql/hook';

function WelcomeHeader({ username }) {
  return <h1>Welcome to the homepage, {username}</h1>;
}

function ReplyHeader({ replyToPost }) {
  return (
    <div>
      <h1>Replying to Post</h1>
      <p>Username: {replyToPost.username}</p>
      <p>Content: {replyToPost.content}</p>
      <p>Created At: {replyToPost.createdAt}</p>
    </div>
  );
}

function HeadElement({ replyToPost }) {
  const { user, loading, error } = useUserDetails(7);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  if (!user) {
    return <div>No user found.</div>;
  }

  return (
    <div>
      {replyToPost ? (
        <ReplyHeader replyToPost={replyToPost} />
      ) : (
        <WelcomeHeader username={user.username} />
      )}
    </div>
  );
}

export default HeadElement;
