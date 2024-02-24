import React, { useEffect, useState } from 'react';
import { getDatabase, push, ref, set, onChildAdded } from 'firebase/database';
import sendBtn from '../assets/send.svg';
import { Fab } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import './GlobalChatroom.css';
import { auth } from '../firebase';

function App() {
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState('');

  const user = auth.currentUser;
  const db = getDatabase();
  const chatListRef = ref(db, 'chats');

  const updateHeight = () => {
    const el = document.getElementById('chat');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  useEffect(() => {
    // Use 'child_added' event to listen for new messages
    onChildAdded(chatListRef, (snapshot) => {
      setChats((prevChats) => [...prevChats, snapshot.val()]);
      updateHeight();
    });
  }, []); // Empty dependency array means this effect will run once when the component mounts

  const sendChat = () => {
    if (msg.trim() !== '') {
      const chatRef = push(chatListRef);
      set(chatRef, {
        user: {
          displayName: user.displayName,
          email: user.email,
        },
        message: msg,
      });
      setMsg('');
      updateHeight();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendChat();
    }
  };

  const scrollToBottom = () => {
    updateHeight();
  };

  return (
    <div className="background">
      {user ? (
        <div>
          <div id="chat" className="chat-container">
            {chats.map((c, i) => (
              <div key={i} className={`container ${c.user.email === user.email ? 'me' : ''}`}>
                <p className="chatbox">
                <strong>{`${c.user.displayName ? `${c.user.displayName}` : `${c.user.email}`}`}</strong>
                  <span>:&nbsp; {c.message}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="chatFooter">
            <div className="btm inp">
              <input
                type="text"
                onInput={(e) => setMsg(e.target.value)}
                value={msg}
                placeholder="Enter your chat"
                onKeyDown={(e) => handleKeyDown(e)}
              />
              <button className="send" onClick={sendChat}>
                <img src={sendBtn} alt="Send" />
              </button>
              <Fab color="secondary" className="floating-button" onClick={scrollToBottom} aria-label="add">
                <ArrowDownwardIcon />
              </Fab>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
