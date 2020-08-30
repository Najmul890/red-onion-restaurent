import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <div className="container">
                <h2>Error: 404</h2>
                <p>Page Not Found</p><br/><br/>
                <Link className="checkout" to="/">Back to Home</Link>
            </div>
        </div>
    );
};

export default NotFound;