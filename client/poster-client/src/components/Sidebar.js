import React from 'react';
import { Link } from 'react-router-dom';
import { getUser, logout } from '../lib/auth';
import {useFollowerList} from '../lib/graphql/hook.js'
import '../styling/Sidebar.css';

function Sidebar() {
  const user = getUser();
  const { followingList, loading, error } = useFollowerList();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li><Link to="/">Home</Link></li>
        {user ? (
          <>
            <li><Link to={`/user/${user.id}`}>Profile</Link></li>
            <li><Link to={`/explore`}>Explore</Link></li>
            <li><Link to={`/chat`}>Private Message</Link></li>
            <div className="following-list-container"> {/* New container for the following list */}
              {followingList && (
                <div className="following-list"> {/* Added div for styling */}
                  <li className="following-list-header">Following</li>
                  {followingList.map((follower) => (
                    <li key={follower.id} className="following-list-item">
                      <Link to={`/user/${follower.id}`}>{follower.username}</Link>
                    </li>
                  ))}
                </div>
              )}
            </div>
            {loading && <li>Loading...</li>}
            {error && <li>Error occurred: {error.message}</li>}
          </>
        ) : (
          <li><Link to="/signup">Sign Up</Link></li>
        )}
      </ul>
      {user && (
        <div className="logout-container">
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
