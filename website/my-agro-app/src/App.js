import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ClipLoader from "react-spinners/ClipLoader";
import './App.css';
import Typewriter from './components/Typewriter';
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const texts=[
    '.....',
  ]
  useEffect(() => {
   
    setTimeout(() => {
      setIsLoading(false); 
    }, 2000); //in ms
  }, []); 
  return (
    <div className="App">
      {isLoading ? (
        <div className="loading">
          <div className="loader-container">
            <p style={{fontSize:"60px"}}>Agrify is loading ..<Typewriter texts={texts} delay={300} infinite={true} /></p> 
            <ClipLoader
              color={"#36d7b7"}
              loading={true}
              cssOverride={""}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
              speedMultiplier={0.5}
            /> 
          </div>
        </div>
      ) : (
        <div>
          <Navbar />
          {/* Add more components here */}
        </div>
      )}
    </div>
  );
}

export default App;
