import React, { useContext, useState } from 'react';
import './navbar.css';
import { assets } from '../../assets/assets.js';
import { Link, useNavigate } from 'react-router-dom';
import { Storecontext } from '../../context/Storecontext.jsx';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("menu");
    const { getTotalCartAmount, token, setToken } = useContext(Storecontext);

    const navigate = useNavigate(); 

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/"); 
        window.scrollTo(0, 0);
    };

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu("Explore")} className={menu === "Explore" ? "active" : ""}>Explore</a>
                <a href='#app-download' onClick={() => setMenu("Mobile-app")} className={menu === "Mobile-app" ? "active" : ""}>Mobile-app</a>
                <a href='#footer' onClick={() => setMenu("ContactUs")} className={menu === "ContactUs" ? "active" : ""}>ContactUs</a>
            </ul>
            <div className="navbar-right">
                <img src="https://img.icons8.com/?size=50&id=59878&format=png&color=000000" alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src="https://img.icons8.com/?size=60&id=fKSdlUERvNZM&format=png&color=000000" alt="" /></Link>
                    <div className="dot"></div>
                </div>
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Signin</button>
                ) : (
                    <div className='navbar-profile'>
                        <img src="https://img.icons8.com/?size=40&id=z-JBA_KtSkxG&format=png&color=000000" />
                        <ul className="nav-profile-dropdown">
                            <li>
                                <img src="https://img.icons8.com/?size=40&id=18638&format=png&color=000000" />
                                <p>Tickets</p>
                            </li>
                            <hr />
                            <li onClick={logout}> 
                                <img src="https://img.icons8.com/?size=20&id=2445&format=png&color=000000" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
