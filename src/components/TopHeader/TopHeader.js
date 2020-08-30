import React from 'react';
import './TopHeader.css';
import logo from '../../img/logo2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { useAuth } from '../SignUp/useAuth';

const TopHeader = (props) => {
    const auth=useAuth();
    return (
        <div className="top-header fixed-top bg-white py-2 ">
            <Link to="/" >
              <img src={logo} alt="" />
            </Link>
            <ul>
                <li className="cart-icon"> 
                      <Link className="cart-link" to="/shipment" >
                         <FontAwesomeIcon className="icon" icon={faCartArrowDown} />
                      </Link>
                      <span style={{fontSize:'20px',marginLeft:'8px'}} >{props.cart.length}</span>
                </li>
                <li>
                    {auth.user ?
                     <p className="user" >welcome {auth.user.displayName} </p>
                    :
                    <Link to="/login" className="log-in" >Log In</Link>
                    }
                </li>
                <li>
                {
                            auth.user ? 
                            <Link to="/" >
                                <button onClick={() => {auth.signOut()}} className="main-btn sign-up">Sign Out</button>
                            </Link>
                            :
                            <Link to="/login" className="nav-link">
                                <button className="main-btn sign-up">Sign Up</button>
                            </Link>
                        }
                </li>
            </ul>
        </div>
    );
};

export default TopHeader;