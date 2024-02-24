import React from "react";
import CartItemControl from "./CartItemControl";
import { IoMdArrowRoundBack } from "react-icons/io";
import {useNavigate} from 'react-router-dom'

const SideBar = (props) => {
  const navigate = useNavigate();
  const { isOpen, cartItems, tools, seeds, fertilizers } = props;
  const sidebarClass = isOpen ? "sidebar open" : "sidebar";
  const overlayClass = isOpen ? "market-overlay on" : "market-overlay off";

  const getItemDetails = (itemName) => {
    const allItems = [];
    if (Array.isArray(tools)) allItems.push(...tools);
    if (Array.isArray(seeds)) allItems.push(...seeds);
    if (Array.isArray(fertilizers)) allItems.push(...fertilizers);
    return allItems.find(item => item.name === itemName);
  };

  return (
    <div>
      <div className={overlayClass}></div>
      <div className={sidebarClass}>
        <div className="side-bar-header">
          <div className="my-cart">
            <IoMdArrowRoundBack
              className="back-arrow"
              onClick={props.toggleSideBar}
            />
            <h1>My Cart</h1>
          </div>
          <button className="checkout" onClick={() => navigate("/comingsoon")}>
            Checkout
          </button>
        </div>
        {cartItems.map((cartItem, index) => {
        // Skip mapping for the first item (index = 0)
          if (index === 0) {
            return null;
          }
  
          const itemDetails = getItemDetails(cartItem.title);
          return (
          <CartItemControl
            key={index}
            addItem={props.addItem}
            removeItem={props.removeItemFromCart} 
            quantity={cartItem.quantity}
            title={cartItem.title}
            image={itemDetails ? itemDetails.image : ''}
          />
  );
})}

      </div>
    </div>
  );  
};

export default SideBar;
