import React from 'react';
import './MarketPlace.css';

function Card({ name, image, rating, desc, price, enhance, addItem }) {
  const handleClick = () => {
    const obj = { title: name, image, rating, desc, price };
    enhance(obj);
  };

  const handleAddToCart = () => {
    addItem(name, image);
  };

  return (
    <div className='card'>
      <img src={image} alt={name} onClick={handleClick} />
      <div className='text-info'>
        <a onClick={handleClick}>
          <h2>{name}</h2>
        </a>
        <p>Rs.&nbsp;{price}</p>
        <p>⭐ {rating}/5</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default Card;
