import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Book.css';
import { Storecontext } from '../../context/Storecontext';
import axios from 'axios';

const Book = () => {
  const { gettotalcartamount,token,place_list,cartItems,url } = useContext(Storecontext);

  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    City:"",
    State:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))


  }

  const book=async (event)=>{
  event.preventDefault();
  let orderItems=[];
  place_list.map((item)=>{
    if(cartItems[item._id]>0){
      let itemInfo=item;
      itemInfo["quantity"]=cartItems[item._id];
      orderItems.push(itemInfo);

    }

  })
  let bookData={
     userId: token,
  
    address:data,
    items:orderItems,
    amount:gettotalcartamount()+2,

  }
  let response=await axios.post(url+"/api/order/place",bookData,{headers:{token}});
  if(response.data.success){
    const {session_url}=response.data;
    window.location.replace(session_url);
  }
  else{
    alert("Error");
  }
  }





  const navigate = useNavigate();
  const location = useLocation();

  // Get total cart amount from navigation state
  const totalCartAmount = location.state?.totalCartAmount || gettotalcartamount();



  return (
    <form onSubmit={book} className='place-order'>
      <div className="place-order-left">
        <p className="title">Booking Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='City' onChange={onChangeHandler} value={data.City} type="text" placeholder='City' />
          <input required name='State' onChange={onChangeHandler} value={data.State} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cartTotal">
          <h2>Total</h2>
          <p className="total-amount">Total Cart Amount: <strong>Rs.{totalCartAmount.toFixed(2)}</strong></p>
        </div>
        <button type='submit' className="cart-button">
          Pay Now
        </button>
      </div>
    </form>
  );
};

export default Book;
