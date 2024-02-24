import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"10px"}}>{title} &nbsp; {isActive ? <FaMinus /> : <FaPlus/>}</div>
      </div>
      {isActive && <div className="accordion-content" style={{textAlign:"left"}}>{content}</div>}
    </div>
  );
};

export default Accordion;