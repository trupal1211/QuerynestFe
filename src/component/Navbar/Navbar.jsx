import React, { useState } from "react";
import "@fontsource/kadwa";
import "@fontsource/jua";
import './navbar.css'
import { FiSearch } from "react-icons/fi"; // Search icon
import {NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import img from '../../assets/profile_photo.jpeg'

function Navbar() {

    let navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <div className={`overlay ${menuOpen ? "active" : ""}`} onClick={closeMenu}></div>
            <div className="nav">
                <div className="logo" onClick={()=>{navigate('./home')}}>
                <p>QueryNest</p>
                </div>
                <div className="search">
                    <FiSearch className="search-icon" />
                    <input type="text" placeholder="Search" ></input>
                </div>
                <div className={`links ${menuOpen && "show"}`}>
                    <p><NavLink to='./home' className={({ isActive }) => (isActive ? "active-link":'link')}> <p>Home</p></NavLink></p>
                    <p><NavLink to='./leaderboard' className={({ isActive }) => (isActive ? "active-link":'link')}> <p> Leaderboard</p></NavLink></p>
                    <p><NavLink to='./profile' className={({ isActive }) => (isActive ? "active-link":'link')}>
                    {
                         !menuOpen?
                         <p className='profile_pic'>
                            <img src={img} alt="" />
                         </p>
                         :<p>profile</p>
                    }
                    </NavLink>
                    </p>
                </div>
                <button className="menu-toggle" onClick={toggleMenu}>
                   {menuOpen?
                   '✖'
                 :'☰'
                 } 
                </button>
            </div>
        </>
    );
}

export default Navbar;
