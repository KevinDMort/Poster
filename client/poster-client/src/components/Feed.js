import Post from '../components/Post.js'
import { useTimeline } from '../lib/graphql/hook.js';
import { useState } from 'react';

const POSTS_PER_PAGE = 4;

function Feed({userID, onReply}) {
  const [currentPage, setCurrentPage] = useState(0);
  const {timeline, loading, error} = useTimeline(POSTS_PER_PAGE, (currentPage)*POSTS_PER_PAGE)
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
        {timeline.map((post) => (
          <Post key={post.id} post={post} onReply={onReply}/>
        ))}
      </div>
    );
  }

export default Feed;