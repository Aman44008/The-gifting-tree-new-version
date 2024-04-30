import React from 'react'
import './Navbar.css'
import logo from '../../assets/Logo_Poster.png';
import profile_logo from '../../assets/profile.png'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='nav-logo' src={logo} alt="" />
        <img src={profile_logo} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar