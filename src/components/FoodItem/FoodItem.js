import React from 'react';
import './FoodItem.css';
import { Link } from 'react-router-dom';


const FoodItem = (props) => {
    const {name,price,key, category,subName, img}=props.product;
    return (
        <div className="foodItem-box" >
           <Link to={"/food/"+key}  className="linked-item"> 
            <div>
            <img src={img} alt=""/>
            <h4> {name} </h4>
            <p>{subName} </p>
            <p> Category: {category}  </p>
            <h4> Price: ${price} </h4>
            
            </div>
          </Link>
        </div>
    );
};

export default FoodItem;