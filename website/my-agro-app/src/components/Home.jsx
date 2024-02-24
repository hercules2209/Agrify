  import React,{useState} from 'react';
  import './Home.css';
  import Typewriter from './Typewriter';
  import Imageslider from './Imageslider';
  import { useMediaQuery } from 'react-responsive';
  import Accordion from './Accordion';
  import { accordionData } from './accordianData.js';
  import { FaFacebook } from "react-icons/fa";
  import { GrInstagram } from "react-icons/gr";
  import { FaXTwitter } from "react-icons/fa6";
  import { IoLogoLinkedin } from "react-icons/io5";
  function Home() {
    const isMedia = useMediaQuery({ maxWidth: 920 });
		const [menuFlex,setMenuFlex] = useState(false);

    
    const texts=[
      'One stop solution for all your farming needs',
      'Your Personal AI Farming Assistant integrated with a mobile app',
      'AI Plant Disease Detection and Diagnosis for 40+ crops',
      'Marketplace for buying and selling crops, tools, fertilizers and pesticides',
      'Crop Recommendation based on soil and weather conditions',
      'Get all the latest news and updates about farming',

    ]
    return (
      
        <div id="textblock">
          
          <Imageslider />
          <div id="about-overlay">
            <div id="textblock-container">
                <h1 id="textblock-title">What is my Agrify?</h1>
                <p id="textblock-content" style={{color:"grey", fontSize:"30px"}}><Typewriter texts={texts} infinite={true} /></p>
                <p id="textblock-content">At Agrify, we are not just a platform; we are the heartbeat of a revolutionary agricultural experience. Rooted in a passion for sustainable farming and technological advancement, we bring you a seamless blend of cutting-edge solutions that empower farmers like never before.<br></br>
                  🌱 <b>Precision Agriculture Redefined</b>:
                  Witness the future of farming with our state-of-the-art plant disease detection technology. We believe in proactive care, ensuring your crops thrive with the precision they deserve. Agrify provides real-time insights and historical weather data, arming you with the knowledge to cultivate with confidence.
                  <br></br>
                  🚀 <b>Accurate Crop Recommendations</b>:
                  Our commitment to your success extends beyond disease detection. Agrify's intelligent algorithms leverage real-time and historical weather data specific to your region, delivering accurate crop recommendations that elevate your yield potential. Say goodbye to guesswork; embrace the science of precision farming.
                  <br></br>
                  💬 <b>Your Farming Companion–Anytime, Anywhere</b>:
                  Meet your virtual agricultural advisor–our responsive chatbot. Whether you're seeking guidance on crop health or need timely healthcare recommendations for your plants, Agrify's chatbot is your 24/7 companion, ensuring you make informed decisions at every stage of cultivation.
                  <br></br>
                  🌐 <b>Marketplace for Agricultural Excellence</b>:
                  Browse our curated marketplace where farmers connect with quality suppliers. From essential farming materials to cutting-edge tools, Agrify's marketplace is your one-stop destination for everything you need to nurture a thriving harvest.
                  <br></br>
                  🤝 <b>Join the Agrify Movement</b>:
                  More than a platform, Agrify is a community of forward-thinking farmers, embracing technology to transform agriculture. Together, we cultivate not just crops but a sustainable future for generations to come.
                </p>
            </div>
          </div>
          <div className="News">

          </div>
          <div className="FAQ" style={{display:"grid", flexDirection:"row",alignContent:"center", justifyContent:"center", gridTemplateColumns:isMedia ? "1fr" : "1fr 1fr" }}>

            <div style={{display:"grid"}}>
              <div style={{display:"flex",justifyContent:isMedia ?"center":"right"}}>
              <img src="https://cdn.myscheme.in/images/questions.svg" alt="FAQ" style={{height:isMedia ?"20rem":"40rem",width:isMedia ?"15rem":"30rem"}}/>
              </div>
            </div>
            <div style={{display:"grid",marginTop:isMedia ?"0rem":"3rem"}}>
              <div style={{display:"flex", flexDirection:"column",justifyContent:isMedia ?"center":"left"}}>
              <h1 style={{fontSize:"40px",color:"grey" ,marginTop:isMedia ?"0rem":"4rem"}}>FAQ</h1>
              <span>          
                <div className="accordion" style={{paddingRight:"4rem"}}> 
                  {accordionData.map(({ title, content }) => (<Accordion title={title} content={content} />))} 
                </div></span>
            </div>
          </div>
          </div>
          <div className="Bottom-section" style={{display:"grid",flexDirection:"row",alignContent:"center",justifyContent:"center",gridTemplateColumns:isMedia?"1fr":"1fr 1fr 1fr"}}>
            <div className="Contactus" style={{display:"grid"}}>
              <div style={{ justifyContent: "center", alignItems: "center"}}>
              <h1>Contact Us</h1>
              <p>For any queries , Contact us at</p>
              <a href="mailto:harshaditya2209@gmail.com">support@agrify.co </a>
              
              </div>
              </div>
              <div style={{display:"grid",  }}>
              <div>
              <h1>Quick links</h1>
              <ul>
              <li><a href="/">Home</a></li>
              <li><a  href="/services">Chatbot</a></li>
              <li><a  href="/disease">Disease Detection</a></li>
              <li><a href="/recommend">Crop Recommendation</a></li>
              <li><a href="/market">Marketplace</a></li>
              </ul>
              </div>

              </div>
              <div style={{display:"grid"}}>
                <div style={{ gap:"0"}}>
                <h1>Follow Us</h1>
                    <ul>
                      <li><a href="https://www.facebook.com/" target='_blank' style={{display:"flex",flexDirection:"row",justifyContent:"center" ,alignItems:"center"}}><FaFacebook color={"white"}/> &nbsp; Facebook</a></li>
                      <li><a href="https://www.instagram.com/" target='_blank' style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}><GrInstagram color={"white"}/>&nbsp;Instagram</a></li>
                      <li><a href="https://twitter.com/" target='_blank' style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}> <FaXTwitter color={"white"}/>&nbsp;Twitter</a></li>
                      <li><a href="https://www.linkedin.com/" target='_blank' style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}><IoLogoLinkedin color={"white"}/>&nbsp; LinkedIn</a></li>
                    </ul>
                  </div>
                </div>
              </div>
        </div>
    );
  }

  export default Home;