import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import {auth} from '../firebase';
import "./Loginsignup.css"

function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password); // Use Firebase's signInWithEmailAndPassword
      navigate('/dashboard'); // Redirect to home page upon successful login
      window.location.reload() 
    } catch (error) {
      setError('The given Username or Password is wrong.'); // Display a more specific error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=''style={{backgroundImage:'url("https://img.freepik.com/premium-vector/abstract-pattern-background-with-futuristic-modern-style-concept_7505-2435.jpg");',height:"100vh"}}>
    <div className="container mx-auto p-4">
      <div className="bg-white p-4 rounded-lg shadow-md log-sign-form">
        <h2 className="text-center text-2xl font-medium mb-4">Log In</h2>
        {error && <div className="bg-red-500 text-white p-4 rounded-lg mb-4">{error}</div>}
        <div>
        <form onSubmit={handleSubmit}>
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
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button onClick={()=>navigate('/forgot-password')} className="text-blue-500 hover:underline">Forgot Password?</button>
        </div>
      </div>
      <div className="text-center mt-4">
        Need an account? <button onClick={()=>navigate('/signup')} className="text-blue-500 hover:underline">Sign Up</button>
      </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
