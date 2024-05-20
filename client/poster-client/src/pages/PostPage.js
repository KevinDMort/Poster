import React from 'react';
import { useParams } from 'react-router-dom';
import Replies from '../components/Replies';
import { usePost } from '../lib/graphql/hook.js'; // Import the custom hook
import PostHeader from '../components/PostHeader.js';
import Sidebar from '../components/Sidebar.js';

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
      <div className="container">
        <Sidebar />  
        <div>
          {/* Render the PostHeader with post details */}
          <PostHeader post={post} />
          {/* Render replies */}
          <Replies post={post} />
        </div>
      </div>
    );
  }
  
  export default PostPage;