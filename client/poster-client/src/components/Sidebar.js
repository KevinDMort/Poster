import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../lib/auth';

function Sidebar() {
  const username = getUser().username;

  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to={`/user/${username}`}>Profile</Link></li>
      </ul>
    </div>
  );
} 

export default Sidebar;
