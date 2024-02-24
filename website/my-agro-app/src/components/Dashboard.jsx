// Updated code
import React, { useState,useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS file
import {auth} from '../firebase';
function Dashboard() {
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null); // State to store the image preview URL
  const defaultPhotoUrl = "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"; // Default profile photo URL
  const currentUser = auth.currentUser; // Get current user directly
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser.photoURL) {
      setImagePreview(currentUser.photoURL);
    } else {
      setImagePreview(defaultPhotoUrl); // Use default image if no profile photo is set
    }
  }, [currentUser.photoURL]);

  const handleLogout = async () => {
    setError('');
  
    try {
      await signOut(auth); // Use signOut from Firebase
      window.location.reload()  
      navigate('/login');
    } catch (error) {
      setError('Failed to log out');
    }
  };

  return (
    
    <div className="dashboard-container">
      <div className="background-overlay">

      <div className="dashboard-card mt-80">
        <h2 className="dashboard-title">Profile</h2>
        {error && <div className="dashboard-error">{error}</div>}
        <div className="dashboard-profile">
          <div className="dashboard-avatar">
            <img src={imagePreview} alt="Profile" className="dashboard-image" />
          </div>
        </div>
        <p className="dashboard-name"><strong>{currentUser.displayName}</strong></p>
        <p className="dashboard-email"><strong>Email:</strong> {currentUser.email}</p>
        <Link to="/update-profile" className="dashboard-button">
          Update Profile
        </Link>
      </div>
      <div className="dashboard-logout">
        <button className="dashboard-link" onClick={handleLogout}>
          Log Out
        </button>
      </div></div>
    </div>
  );
}

export default Dashboard;
