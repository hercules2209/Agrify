import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {  useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import {auth} from '../firebase';
import "./Loginsignup.css"
import { getDatabase, ref, set } from 'firebase/database';
function Signup() {
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [refPassword,setRefPassword]= useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setError('');
      setLoading(true);
      if (password !== refPassword) {
        throw new Error('Passwords do not match'); // Throw a custom error if passwords don't match
      }
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email.replace('.', '_');
      const db = getDatabase();
      const userCartRef = ref(db, `CART/${userEmail}`);
      await set(userCartRef, [{
        "price": 0,
        "quantity": 1,
        "title": "Your mom"
      }]);
      navigate('/dashboard');
    } catch (error) {
      let errorMessage;
      switch (error.code) {
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use';
          break;
        default:
          errorMessage = error.message;
      }
      setError(errorMessage); // Display the error message
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mx-auto p-4" style={{backgroundImage:'url("https://img.freepik.com/premium-vector/abstract-pattern-background-with-futuristic-modern-style-concept_7505-2435.jpg");',height:"100vh"}}>
      <div></div>
      <div className="bg-white p-4 rounded-lg shadow-md log-sign-form">
        <h2 className="text-center text-2xl font-medium mb-4">Sign Up</h2>
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
              onChange={(e) => setEmail(e.target.value)}r
              equired
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
          <div className="mb-4">
            <label htmlFor="password-confirm" className="block text-gray-700 font-bold mb-2">
              Password Confirmation
            </label>
            <input
              type="password"
              id="password-confirm"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setRefPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
      <div className="text-center mt-4">
        Already have an account? <button onClick={()=>navigate('/login')} className="text-blue-500 hover:underline">Log In</button>
        </div>
      </div>
    </div>
  );
}
export default Signup;
  