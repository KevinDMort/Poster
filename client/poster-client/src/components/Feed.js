import React, { useState } from 'react';
import Post from '../components/Post.js';
import { useTimeline } from '../lib/graphql/hook.js';
import '../styling/HomePage.css';

const POSTS_PER_PAGE = 4;

function Feed() {
  const [currentPage, setCurrentPage] = useState(0);
  const { timeline, loading, error } = useTimeline(POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleLoadLess = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error has occurred</div>;
  }

  return (
    <div>
      {timeline.map((post) => (
        <div key={post.id}>
          <Post post={post} />
        </div>
      ))}
      <div className="button-container">
        {currentPage > 0 && (
          <button className="navigation-button" onClick={handleLoadLess}>Go Back</button>
        )}
        {timeline.length === POSTS_PER_PAGE && (
          <button className="navigation-button" onClick={handleLoadMore}>Load More</button>
        )}
      </div>
    </div>
  );
}

export default Feed;
