import { useState } from 'react';
import Feed from '../components/Feed.js'
import { useTimeline } from '../lib/graphql/hook.js';

const POSTS_PER_PAGE = 10;

function HomePage() {
  const [currentPage, setCurrentPage] = useState(0);
  const {timeline, loading, error} = useTimeline(7,POSTS_PER_PAGE, (currentPage)*POSTS_PER_PAGE)
  if(loading)
    {
      return <div>Loading...</div>
    }
  if(error)
    {
      return <div>Error has occoured</div>
    }
  return (
    <div>
      <h1>
        HomePage
      </h1>
      <Feed timeline= {timeline}></Feed>
    </div>
  );
}

export default HomePage;
