import React from 'react';
import './Banner.css';


const Banner = () => {
    return (
        <div className="banner" >
            <div className="header">
                <h2>Best Food Waiting For Your Belly</h2>
                <div className="search-box">
                <input placeholder="Search Food Item" type="text"/>
                <button className="sign-up main-btn" >Search</button>
            </div>
            </div>
            
        </div>
    );
};

export default Banner;
