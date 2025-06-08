import React, { useContext, useEffect, useState } from 'react';
import './Mybooking.css';
import { Storecontext } from '../../context/Storecontext';
import axios from 'axios';

const Mybooking = () => {
  const { url, token } = useContext(Storecontext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + "/api/booking/mybookings", {}, { headers: { token } });
      // Filter only successful payments
      const paidOrders = response.data.data.filter(order => order.paymentStatus === 'paid');
      setData(paidOrders);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>Booking status</h2>
      <div className="container">
        {data.length > 0 ? (
          data.map((order, index) => (
            <div key={index} className='my-orders-order'>
              <img src="https://img.icons8.com/?size=100&id=WC4qa7sbIuMg&format=png&color=000000" alt="Booking Icon" />
              <p>
                {order.items.map((item, itemIndex) =>
                  itemIndex === order.items.length - 1 
                    ? `${item.name} x ${item.quantity}` 
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>
              <p>${order.amount}.00</p>
              <p>Places: {order.items.length}</p>
              <p><span>&#x25cf;</span><b>{order.status}</b></p>
              <button onClick={fetchOrders}>Track ticket</button>
            </div>
          ))
        ) : (
          <p>Booking successfull.</p>
        )}
      </div>
    </div>
  );
};

export default Mybooking;
