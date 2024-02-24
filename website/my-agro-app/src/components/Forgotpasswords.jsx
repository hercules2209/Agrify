import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import {auth} from '../firebase';
function Forgotpassword() {
  const [email,setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setMessage('Check your inbox for further instructions');
    } catch (error) {
      setError(error.message); // Display a more specific error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{position:"relative",height:"100vh"}}>
    <div className="container mx-auto p-4">
      <div className="background-cover">
      <div className="bg-white p-4 rounded-lg shadow-md" style={{position:"absolute",top:"25vh",left:"40vw"}}>
        <h2 className="text-center text-2xl font-medium mb-4">Password Reset</h2>
        {error && <div className="bg-red-500 text-white p-4 rounded-lg mb-4">{error}</div>}
        {message && <div className="bg-green-500 text-white p-4 rounded-lg mb-4">{message}</div>}
        <div>        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        <div className="mt-4 text-center">
        <button onClick={()=>navigate('/login')} className="text-blue-500 hover:underline">Log In</button>
        </div>
      </div>
      <div className="text-center mt-4">
        Need an account?<button onClick={()=>navigate('/signup')} className="text-blue-500 hover:underline">Sign Up</button>

      </div>
      </div>

    </div>
    </div>    
    </div>
  );
}

export default Forgotpassword;
