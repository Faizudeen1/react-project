import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import CheckInOut from './CheckInOut';

function Profile() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Welcome, {auth.currentUser?.email}</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <CheckInOut /> {/* Include the CheckInOut component */}
    </div>
  );
}

export default Profile;
