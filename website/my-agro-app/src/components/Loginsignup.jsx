import React, { useState } from 'react';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import './Loginsignup.css';
import { useNavigate } from "react-router-dom";

function LoginSignup() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const toggleSection = () => {
    setShowLogin(!showLogin);
  };

  return (
    
    <div className="" style={{display:"flex", flexDirection:"column",}} >
      <div className='test'></div>
      <div className='log-sign-form'>
        {showLogin? (navigate("/signup")) : (navigate("/login")) }
      </div>
      <button className="the-switch"onClick={toggleSection}>
        {showLogin ? 'Switch to Signup' : 'Switch to Login'}
      </button>
      <div></div>
      
    </div>
  );
}

export default LoginSignup;
