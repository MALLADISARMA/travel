import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { Storecontext } from '../../context/Storecontext';

const Cart = () => {
  const { cartItems, place_list, removeFromCart, gettotalcartamount } = useContext(Storecontext);
  const navigate = useNavigate();

  // Calculate the total cart amount
  const totalCartAmount = gettotalcartamount();

  return (
    <div className='cart'>
      {totalCartAmount > 0 ? (
        <>
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Places</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <hr />
            {place_list.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={item._id} className='cart-items-title cart-items-item'>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>{item.price * cartItems[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className="cart-bottom">
            <div className="cartTotal">
              <h2>Totals</h2>
              <p className="total-amount">Total Cart Amount: <strong>Rs.{totalCartAmount.toFixed(2)}</strong></p>
            </div>
            <button onClick={() => navigate('/book', { state: { totalCartAmount } })} className="cart-button">
              Proceed
            </button>
          </div>
        </>
      ) : (
        <h2 className="empty-cart-message">Your cart is empty</h2>
      )}
    </div>
  );
}

export default Cart;
