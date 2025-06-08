import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className="sidebar">
    <div className="sidebar-options"  >
    <NavLink to='/add' className="sidebar-option" >
    <img src="https://img.icons8.com/?size=100&id=60953&format=png&color=000000"/>
    <p>Add places</p>

    </NavLink>
    <NavLink to='/list' className="sidebar-option" >
    <img src="https://img.icons8.com/?size=100&id=11818&format=png&color=000000"/>
    <p>List places</p>

    </NavLink>
    <NavLink to='/orders' className="sidebar-option" >
    <img src="https://img.icons8.com/?size=100&id=RnJTVOTmRdxE&format=png&color=000000"/>
    <p>orders</p>

    </NavLink>

    </div>
      
    </div>
  )
}

export default Sidebar
