import './Chatbot.css';
import { useEffect, useState,useRef } from 'react';
import gptLogo from '../assets/chatgpt.svg';
import addBtn from '../assets/add-30.png';
import msgIcon from '../assets/message.svg';
import home from '../assets/home.svg';
import saved from '../assets/bookmark.svg';
import rocket from '../assets/rocket.svg';
import sendBtn from '../assets/send.svg';
import userIcon from '../assets/user-icon.jpeg';
import gptImgLogo from '../assets/chatgptLogo.svg';
import Logo from "../assets/logo.png"
import { FaPlus } from "react-icons/fa6";

function Chatbot() {
  const msgEnd=useRef(null);
  const [input,setInput] = useState('');
  const [messages,setMessages] = useState([
    {
    text: "Hi, I`m AgroBot. Designed to help you with your queries.",
    isBot: true,}
  ]);
  useEffect(()=>{
    msgEnd.current.scrollIntoView();
   },[messages]); 
  const corsProxyUrl = 'https://us-central1-diseasedet.cloudfunctions.net';
  const handleSend = async() => {
    const text=input;
    setInput((prevInput)=>'');
    setMessages((prevMessages)=>[
      ...prevMessages,
      {text, isBot: false}
    ]);
    try{
      const response = await fetch(`${corsProxyUrl}/chatbot`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({query: text}),

      });
      console.log('Received Request',response)
      const responseData = await response.json();
    
      setMessages((prevMessages)=>[
        ...prevMessages,
        {text:responseData.details, isBot: true},
      ]);
    } catch(error){
      console.error('Error sending message:',error);
    }
  };
  const handleEnter=async(e)=>{
    if(e.key==='Enter')await handleSend();
    
  };
  const handleQuery=async(e)=>{
    const text=e.target.value;
    setInput((prevInput)=>'');
    setMessages((prevMessages)=>[
      ...prevMessages,
      {text, isBot: false}
    ]);
    try{
      const response = await fetch(`${corsProxyUrl}/chat`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
          body:JSON.stringify({query: text}),
      });
      const responseData = await response.json();
      setMessages((prevMessages)=>[
        ...prevMessages,
        {text:responseData.details, isBot: false},
      ]);
    }catch(error){
      console.error('Error sending message:',error);
    }
  };

  return (
    <div className="Main">
      <div className="Empty"></div>
      <div className='sideBar'>
        <div className='upperSide'>
          <div className='upperSideTop'><img src={gptLogo} alt="Logo" className='logo'/><span className="brand">AgroBot</span></div>

          <button className='midBtn' onClick={()=>{window.location.reload()}}><img src={addBtn} alt="new chat" className='addBtn'/>New Chat</button>

          <div className='upperSideBottom'>

            <button className='query' onClick={handleQuery} value={"What is Programming?"}><img src={msgIcon} alt="Query"/>What is Programming?</button>
            <button className='query' onClick={handleQuery} value={"How to use an API??"}><img src={msgIcon} alt="Query"/>How to use an API?</button>

          </div>
        </div>

        <div className='lowerSide'>
          <div className='listItems'><img src={home} alt="Home" className='listItemsImg'/>Home</div>
          <div className='listItems'><img src={saved} alt="Saved" className='listItemsImg'/>Saved</div>
          <div className='listItems'><img src={rocket} alt="Upgrade" className='listItemsImg'/>Upgrade</div>
        </div>


      </div>

      <div className='main'>
        <div className='chats'>
          {messages.map((message,i)=>
            <div key={i} className={message.isBot?'chat bot':"chat"}>
              <img className='chatImg' src={message.isBot?Logo:userIcon} alt="GPT"/><p className='txt'>{ message.text }</p>
            </div>
          )}
          <div ref={msgEnd}></div>
          
        </div>
        <div className='chatFooter'>
          <div><button className='new-chat' onClick={()=>window.location.reload()}><FaPlus size="30"/></button></div>
        
          <div className="inp">
            <input required type="text" placeholder='Type a message' value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}}/>
            <button className='send' onClick={handleSend}><img src={sendBtn} alt="Send" /></button>
          </div>
        </div>
      </div>
      
      
    </div>
  );
}
export default Chatbot;