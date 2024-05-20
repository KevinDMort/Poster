import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserDetails } from '../lib/graphql/hook';
import Sidebar from '../components/Sidebar'
import UserHeader from '../components/UserHeader';
import '../styling/HomePage.css';


function UserProfile() {
  const { id } = useParams();
  const { user, loading, error } = useUserDetails(id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  return (
    <div className="container">
      <Sidebar/>
      <div className="main-content">
        <div className="header-bar">
          <UserHeader userID={user.id}/>
        </div>
      </div>
      
    </div>
  );
}

export default UserProfile;
