import React from 'react'
import './Footer.css'
import {assets} from '../../assets/assets'
const Footer = () => {
  return (
    <div className="footer" id='footer'>
    <div className="footer-content">
        <div className="footer-content-left">
         
         <p>Make your Trips Happy
</p>
<div className="footer-social-icons">
<p>Indian Tourism</p>
    <img src="https://img.icons8.com/?size=60&id=Xy10Jcu1L2Su&format=png&color=000000" alt=""/>
    <img src="https://img.icons8.com/?size=60&id=7OeRNqg6S7Vf&format=png&color=000000" alt=""/>
    <img src="https://img.icons8.com/?size=60&id=xuvGCOXi8Wyg&format=png&color=000000" alt=""/>
</div>
        </div>
        <div className="footer-content-center">
        <h2>COMPANY</h2>
        <ul>
            <li>Home</li>
            <li>About US</li>
            <li>Bookings</li>
            <li>Privacy policy</li>

        </ul>

        </div>
        <div className="footer-content-right">
        <h2>GET IN TOUCH</h2>
        <ul>
            <li>+91-8978144523</li>
            <li>iitsmemchintu@gmail.com</li>
        </ul>

        </div>
        
    </div>
    <hr/>
    <p className="footer-copyright">© 2024 IndianTourism. All rights reserved.
    Designed with care for a seamless user experience.</p>
      
    </div>
  )
}

export default Footer
