import React, {useContext, useRef, useState} from 'react'
import './Navbar.css'
import logo from '../Assets/Logo_Poster.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import dropdown_menu_icon from '../Assets/dropdown_menu_icon.png'

export const Navbar = () => {
    const[menu, setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e)=>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <Link to={'/'}><img src={logo} alt="" /></Link>
        </div>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={dropdown_menu_icon} alt="" />
        <ul ref={menuRef} className='nav-menu'>
            <li onClick={()=>{setMenu("shop")}}><Link to='/'>Shop</Link>{menu === "shop" ? <hr/> :<></>}</li>
            <li onClick={()=>{setMenu("gifts")}}><Link to='/gifts'>Gifts</Link>{menu === "gifts" ? <hr/> :<></>}</li>
            <li onClick={()=>{setMenu("decoration")}}><Link to='/decoration'>Decoration</Link>{menu === "decoration" ? <hr/> :<></>}</li>
            <li onClick={()=>{setMenu("logo")}}><Link to='/logo'>Logo</Link>{menu === "logo" ? <hr/> :<></>}</li>
        </ul>
        <div className="nav-login-cart">
            {localStorage.getItem('auth-token')
            ?<button onClick={()=>{localStorage.removeItem('auth-token'); window.location.replace('/')}}>Logout</button>
            :<Link to='/login'><button>Login</button></Link>}
            
            <Link to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}
