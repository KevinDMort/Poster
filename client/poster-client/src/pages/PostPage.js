import React from 'react';
import { useParams } from 'react-router-dom';
import Replies from '../components/Replies';
import { usePost } from '../lib/graphql/hook.js'; 
import PostHeader from '../components/PostHeader.js';
import Sidebar from '../components/Sidebar.js';
import '../styling/HomePage.css';

function PostPage() {
    const { postId } = useParams();
    const { post, loading, error } = usePost(postId); 
  
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
          <div className="main-content">
              <PostHeader post={post} />
          <Replies post={post} />
      </div>
      </div>
    );
  }
  
  export default PostPage;