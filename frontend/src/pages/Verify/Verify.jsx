import React, { useCallback, useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Storecontext } from '../../context/Storecontext';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const { url } = useContext(Storecontext);
    const navigate = useNavigate();

    const verifyPayment = useCallback(async () => {
        try {
            const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
            if (response.data.success) {
                navigate("/mybookings");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            navigate("/");
        }
    }, [url, success, orderId, navigate]);

    useEffect(() => {
        if (success !== null && orderId) {
            verifyPayment();
        }
    }, [verifyPayment]);

    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    );
}

export default Verify;
