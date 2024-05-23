import React from 'react';
import { useUserDetails } from '../lib/graphql/hook';
import { FaUserFriends, FaMapMarkerAlt, FaInfoCircle, FaUserCircle} from 'react-icons/fa';
import '../styling/HomePage.css';

function UserHeader ({userID}) {

  const { user, loading, error } = useUserDetails(userID);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  return (
    <div className="header-container">
      <div className="user-info">
        <div className="user-header">
          <FaUserCircle className="avatar-icon" />
          <h1>{user.username}</h1>
        </div>
        <div className="user-details">
          <div className="user-detail">
            <FaUserFriends className="icon" />
            <span>Followers: {user.followerCount}</span>
          </div>
          <div className="user-detail">
            <FaMapMarkerAlt className="icon" />
            <span>{user.location}</span>
          </div>
          <div className="user-detail">
            <FaInfoCircle className="icon" />
            <span>{user.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHeader;
