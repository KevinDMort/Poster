import React from 'react';
import { useUserDetails } from '../lib/graphql/hook';
import  {getUser} from '../lib/auth.js'
import '../styling/HomePage.css';

function UserHeader () {
  const tokenUser = getUser();

  const { user, loading, error } = useUserDetails(tokenUser.id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  return (
    <div className="header-container">
    <div className="user-info">
      <h1>{user.username}</h1>
      <p>{user.email}</p>
      <p>Followers: {user.followers}</p>
    </div>

    </div>
  );
}

export default UserHeader;
