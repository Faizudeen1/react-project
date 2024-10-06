import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import CheckInOut from './CheckInOut';

function Profile() {
  const [user, setUser] = useState(null); // Store user state
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // If logged in, set the user state
      } else {
        navigate('/login'); // Redirect to login if not logged in
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Optional: Show loading while checking user
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Welcome, {user.email}</h1> {/* Use user state instead of auth.currentUser */}
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <CheckInOut /> {/* Include the CheckInOut component */}
    </div>
  );
}

export default Profile;
