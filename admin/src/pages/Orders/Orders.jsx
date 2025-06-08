import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.error(error);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating status");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length === 0 && <p>No orders found.</p>}
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img
              src="https://img.icons8.com/?size=100&id=WC4qa7sbIuMg&format=png&color=000000"
              alt="order icon"
            />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, idx) =>
                  idx === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city + ", " +
                    order.address.state + ", " +
                    order.address.country + ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="ticket booking">Ticket Booking</option>
              <option value="waiting list">Waiting</option>
              <option value="Booked">Ticket Booked</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
