import React, { useState, useEffect } from 'react';
import './MarketPlace.css';
import Card from './Card.jsx';
import Cart from './Cart.jsx';
import ItemEnhanced from './itemEnhanced.jsx';
import { getDatabase, ref, onValue, get,update ,push} from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.js';

function MarketPlace() {
  const [tools, setTools] = useState([]);
  const [seeds, setSeeds] = useState([]);
  const [fertilizers, setFertilizers] = useState([]);
  const [displayEnhanced, setDisplayEnhanced] = useState(false);
  const [enhancedContent, setEnhancedContent] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    const db = getDatabase();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userEmail = currentUser.email;
      const userCartRef = ref(db, `CART/${userEmail.replace('.', '_')}`);
      const toolsRef = ref(db, 'tools');
      const seedsRef = ref(db, 'seeds');
      const fertilizersRef = ref(db, 'fertilizers');

      get(userCartRef).then((snapshot) => {
        const cartItems = snapshot.val();
        if (cartItems) {
          console.log(cartItems); // This should log the desired list
          // Do something with the cart items here
        } else {
          console.log("No cart items found for the user");
        }
      });

      const fetchData = (snapshot, setter) => {
        const data = snapshot.val();
        if (data) {
          setter(data);
        }
      };
      
      
      console.log(cartItems);
      onValue(toolsRef, (snapshot) => fetchData(snapshot, setTools));
      onValue(seedsRef, (snapshot) => fetchData(snapshot, setSeeds));
      onValue(fertilizersRef, (snapshot) => fetchData(snapshot, setFertilizers));
    } else {

      const toolsRef = ref(db, 'tools');
      const seedsRef = ref(db, 'seeds');
      const fertilizersRef = ref(db, 'fertilizers');

      const fetchData = (snapshot, setter) => {
        const data = snapshot.val();
        if (data) {
          setter(data);
        }
      };

      onValue(toolsRef, (snapshot) => fetchData(snapshot, setTools));
      onValue(seedsRef, (snapshot) => fetchData(snapshot, setSeeds));
      onValue(fertilizersRef, (snapshot) => fetchData(snapshot, setFertilizers));
    }
  }, []);

  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  const toggleEnhanced = (contents) => {
    setEnhancedContent(contents);
    setDisplayEnhanced(!displayEnhanced);
  };

  const addItemToCart = (item, quantity) => {
    console.log('Adding item to cart:', item);
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.log("User not logged in.");
      // navigate to /login use react uNavigate
      navigate("/login");

      return;
    }
    const userEmail = currentUser.email;
    const db = getDatabase();
    const cartRef = ref(db, `CART/${userEmail.replace('.', '_')}`);
    
    get(cartRef).then((snapshot) => {
      const existingCart = snapshot.val();
      let updatedCartItems = existingCart ? [...existingCart] : []; // Preserve existing items or initialize new array
      const existingItemIndex = updatedCartItems.findIndex((cartItem) => cartItem.title === item.name);
  
      if (existingItemIndex !== -1) {
        updatedCartItems[existingItemIndex].quantity += quantity;
      } else {
        updatedCartItems.push({ title: item.name, quantity: quantity, price: item.price });
      }
  
      // Convert array to object with Firebase's push key
      const updatedCart = updatedCartItems.reduce((acc, curr, index) => {
        acc[index] = curr;
        return acc;
      }, {});
  
      // Update cart in database
      update(cartRef, updatedCart)
        .then(() => {
          console.log('Cart updated:', updatedCartItems);
          setCartItems(updatedCartItems); // Update local state
        })
        .catch((error) => {
          console.error('Error updating cart:', error);
        });
    }).catch((error) => {
      console.error('Error fetching cart data:', error);
    });
  };  
  const removeItemFromCart = (itemTitle) => {
    console.log('Removing item from cart:', itemTitle);
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.log("User not logged in.");
      navigate("/login");
      return;
    }
    const userEmail = currentUser.email;
    const db = getDatabase();
    const cartRef = ref(db, `CART/${userEmail.replace('.', '_')}`);
  
    get(cartRef)
      .then((snapshot) => {
        const existingCart = snapshot.val();
        if (!existingCart) {
          console.log("Cart is empty.");
          return;
        }
  
        // Find the item in the cart
        const updatedCartItems = existingCart.map((cartItem) => {
          if (cartItem.title === itemTitle) {
            // Reduce the quantity by 1 if it's greater than 1
            if (cartItem.quantity > 1) {
              cartItem.quantity -= 1;
            } else {
              // If quantity is 1, remove the item completely
              return null;
            }
          }
          return cartItem;
        }).filter(Boolean); // Filter out null values (items with quantity 1)
  
        // Convert array to object with Firebase's push key
        const updatedCart = updatedCartItems.reduce((acc, curr, index) => {
          acc[index] = curr;
          return acc;
        }, {});
  
        // Update cart in database
        update(cartRef, updatedCart)
          .then(() => {
            console.log('Item removed from cart:', itemTitle);
            setCartItems(updatedCartItems); // Update local state
          })
          .catch((error) => {
            console.error('Error updating cart:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
      });
  };
  
  
    
  

  const renderItems = (items) => {
    return items.map((item, index) => (
      <Card
        key={index}
        image={item.image}
        name={item.name}
        rating={item.rating}
        addItem={() => addItemToCart(item, 1)} // Add one item at a time
        enhance={toggleEnhanced} // Pass the toggleEnhanced function
        desc={item.desc}
        price={item.price}
      />
    ));
  };

  return (
    <div className='background'>
    <div className='market-main'>
      {displayEnhanced && (
        <ItemEnhanced
          close={() => setDisplayEnhanced(false)}
          title={enhancedContent.title}
          desc={enhancedContent.desc}
          image={enhancedContent.image}
          addItem={() => addItemToCart(enhancedContent, 1)}
          price={enhancedContent.price}
        />
      )}
      <div className='section-head'>
      <div className="cartPosition">
      <Cart
        cartItems={cartItems}
        tools={tools}
        seeds={seeds}
        fertilizers={fertilizers}
        removeItemFromCart={removeItemFromCart} // Pass removeItemFromCart function to Cart
      />
      </div>
        <h1>Tools</h1>
      </div>
      <div className='scroll-menu'>{renderItems(tools)}</div>
      <div className='section-head'>
        <h1>Seeds</h1>
      </div>
      <div className='scroll-menu'>{renderItems(seeds)}</div>
      <div className='section-head'>
        <h1>Fertilizers</h1>
      </div>
      <div className='scroll-menu'>{renderItems(fertilizers)}</div>
    </div>
    <footer id='Market-footer'>Demo Created With 💀 By&nbsp;<a id="textblock-devsense" href="https://hercules2209.github.io/">Agrify.co</a> &copy;2024 Agrify</footer>

    </div>
    

  );
}

export default MarketPlace;
