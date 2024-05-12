import {Link} from 'react-router-dom';
import Post from '../components/Post.js'


function Feed({ timeline }) {
    return (
      <div>
        {timeline.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    );
  }

export default Feed;