import React from 'react';
import { useParams } from 'react-router-dom';
import HeadElement from '../components/HeadElement';
import Replies from '../components/Replies';
import { usePost } from '../lib/graphql/hook.js'; // Import the custom hook

function PostPage() {
    const { postId } = useParams();
    const { post, loading, error } = usePost(postId); // Use the custom hook to fetch the post
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error occurred: {error.message}</div>;
    }
  
    if (!post) {
      return <div>Post not found.</div>;
    }
  
    return (
      <div>
        {/* Render the HeadElement with post details */}
        <HeadElement post={post} />
        {/* Render replies */}
        <Replies post={post} />
      </div>
    );
  }
  
  export default PostPage;