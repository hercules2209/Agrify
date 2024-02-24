import React from 'react';
import { IoIosClose } from 'react-icons/io';
import './MarketPlace.css'; // Import CSS file for styling if needed

function ItemEnhanced({ close, title, desc, image, addItem, price }) {
  const handleAddToCart = () => {
    addItem(title, image);
  };

  return (
    <div className='item-enhanced'>
      <div className='left'>
        <IoIosClose className='close-button' onClick={() => close({})} />
        <img className='item-image' src={image} alt={title} />
      </div>
      <div className='right'>
        <div className='item-details'>
          <h1>{title}</h1>
          <p>Rs.&nbsp;{price}</p>
          <p>{desc}</p>
          <div className='button-group'>
            <button className='add-cart' onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className='buy-now'>
              <a href='/comingsoon'>Buy Now</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemEnhanced;
