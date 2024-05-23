import React from 'react';
import Post from './Post';

function PostHeader({ post }) {
console.log(post,'header');
  return (
    <Post post={post}/>
  );
}

export default PostHeader;
