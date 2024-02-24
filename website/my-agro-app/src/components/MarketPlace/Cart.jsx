import React, { useState } from 'react';
import './MarketPlace.css';
import variant from './cart-variant.svg';
import SideBar from './SideBar';

function Cart(props) {
  const { cartItems, tools, seeds, fertilizers } = props;
  const [sidebarOpen, setSideBarOpen] = useState(false);

  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <div>
      <div className='cart'>
        <button onClick={handleViewSidebar}><img className= "cartImg" src={variant} alt="cart" /></button>
      </div>
      <SideBar
        cartItems={cartItems}
        
        tools={tools}
        seeds={seeds}
        fertilizers={fertilizers}
        isOpen={sidebarOpen}
        toggleSideBar={handleViewSidebar}
        removeItemFromCart={props.removeItemFromCart} 
        addItem={props.addItem}
      />
    </div>
  );
}

export default Cart;
