import React, { useState, useEffect } from 'react';
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Link, useNavigate } from 'react-router-dom';
import { auth, storage } from '../firebase'; // Make sure to import the storage reference

function Updateprofile() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState(''); // New state variable for display name
  const [photo, setPhoto] = useState(null); // New state variable for photo file
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const currentUser = auth.currentUser;
  const [imagePreview, setImagePreview] = useState(null); // State to store the image preview URL
  const defaultPhotoUrl = "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"; // Default profile photo URL

  // Load the current user's profile photo URL on component mount
  useEffect(() => {
    if (currentUser.photoURL) {
      setImagePreview(currentUser.photoURL);
    } else {
      setImagePreview(defaultPhotoUrl); // Use default image if no profile photo is set
    }
  }, [currentUser.photoURL]);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file); 
    // Update image preview when a new photo is selected
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const promises = [];
    if (email !== currentUser.email) {
      promises.push(updateEmail(currentUser, email));
    }
    if (password) {
      promises.push(updatePassword(currentUser, password));
    }
    if (displayName !== currentUser.displayName) {
      promises.push(updateProfile(currentUser, { displayName }));
    }
    if (photo) {
      const photoRef = ref(storage, `profilePhotos/${currentUser.uid}`);
      const uploadResult = await uploadBytes(photoRef, photo);
      const photoURL = await getDownloadURL(uploadResult.ref);
      promises.push(updateProfile(currentUser, { photoURL }));
    }

    try {
      setError('');
      setLoading(true);
      await Promise.all(promises);
      navigate('/dashboard'); // Redirect to home page after successful update
    } catch (error) {
      setError(error.message);
      //write code to print Firebase: Error (auth/requires-recent-login). as an error message when user is not logged in for a long time
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container  p-4 flex-row justify-center ">
      <div className=" mt-40 pt-6">
      <div className="bg-white p-4 rounded-lg shadow-md w-96 ">
        <h2 className="text-center text-2xl font-medium mb-4">Update Profile</h2>
        {error && <div className="bg-red-500 text-white p-4 rounded-lg mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
                  
          <div style={{display:"flex", justifyContent:"center",flexDirection:"row"}}>
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-bold mb-2">
              Profile Photo
            </label>
            <div className="border rounded-full w-40 h-40 flex justify-center items-center bg-gray-200 cursor-pointer hover:bg-gray-300 relative">
              <img src={imagePreview} alt="Profile" className="max-40 rounded-full max-40" />
            <input
              type="file"
              id="photo"
              className="absolute inset-0 w-40 h-40 opacity-0 cursor-pointer"
              onChange={handlePhotoChange}
            />
          </div>
        </div>
        </div>
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
              defaultValue={currentUser.email}
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
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Leave blank to keep the same"
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
              placeholder="Leave blank to keep the same"
            />
          </div>
          {/* New form field for display name */}
          <div className="mb-4">
            <label htmlFor="displayName" className="block text-gray-700 font-bold mb-2">
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setDisplayName(e.target.value)}
              defaultValue={currentUser.displayName || ''}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
      <div className="text-center mt-4">
        <Link to="/dashboard" className="text-blue-500 hover:underline">Cancel</Link>
      </div>
    </div>
    </div>
  );
}

export default Updateprofile;
