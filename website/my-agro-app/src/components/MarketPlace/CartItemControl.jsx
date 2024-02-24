import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";

function CartItemControl(props) {
  const [quantity, setQuantity] = useState(props.quantity);

  useEffect(() => {
    setQuantity(props.quantity);
  }, [props.quantity]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    props.addItem(props.title); // Pass the entire item object
  };

  const decreaseQuantity = () => {
    props.removeItem(props.title); 
  };

  if (quantity > 0) {
    return (
      <div className='item'>
        <div className='item-identifier'>
          <img src={props.image} alt="" />
          <h2>{props.title}</h2>
        </div>
        <div className="quantity-dial">
          <button onClick={decreaseQuantity}><FaMinus /></button>
          <p>{quantity}</p>
          <button onClick={increaseQuantity}><FaPlus /></button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default CartItemControl;
