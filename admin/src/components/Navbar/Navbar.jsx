import React from 'react'
import './navbar.css'
import {assets} from '../../assets/assets'
const Navbar = () => {
  return (
    <div className='navebar' >
    <img className='logo' src={assets.logo} alt="" />
    Admin Panel
    <img className='profile' src="https://img.icons8.com/?size=100&id=LiT5uX54lD4l&format=png&color=000000"/>
      
    </div>
  )
}

export default Navbar
