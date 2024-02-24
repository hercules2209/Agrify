import React from 'react';

import Typewriter from './Typewriter';
function Home() {
  const texts=[
    '.....',
  ]
  return (
    
      <div id="textblock" style={{}}>
        <div>
        <p style={{fontSize:"60px"}}>Coming <br/> soon..<Typewriter texts={texts} delay={100} infinite={true} /></p> 
        </div>
        <footer id='Home-footer' style={{bottom:0,position:"absolute",width:"100%", marginBottom:"0" }}>Demo Created With 💀 By&nbsp;<a id="textblock-devsense" href="https://hercules2209.github.io/">El Primero</a></footer>
      </div>
  );
}

export default Home;