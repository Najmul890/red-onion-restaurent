import React, { useState} from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import './FoodDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { addToDatabaseCart} from '../../utilities/databaseManager';

const FoodDetail = (props) => {
    const [food, setFood] = useState(fakeData);
    const { foodKey } = useParams();
    const [quantity, setQuantity] = useState(1);
    
    const singleFood = food.find(data => data.key === foodKey);
    const { name, details, orgImg, price } = singleFood;

    const finalCartHandler=(singleFood)=>{
        singleFood.quantity= quantity;
        console.log(singleFood.quantity)
        addToDatabaseCart(singleFood.key, singleFood.quantity);
        props.setCart([...props.cart, singleFood ]);
        
        props.cartHandler(singleFood);
        
    }

    
    //    const finalCartHandler=singleFood=>{
    //        singleFood.quantity=quantity;
    //        addToDatabaseCart(singleFood.key, singleFood.quantity);
    //        console.log(quantity)
    //        //props.setCart([...props.cart, singleFood ])
    //        props.cartHandler(singleFood);
           
    //    }
       

    return (
        <div className="detail-container">
            <div className="content">
                <h2>{name} </h2>
                <p>{details} </p>

                <div className="count-area">
                    <h2>Price {price.toFixed(2)} </h2>
                    <div className="bttn-area">
                    <button className="count-btn"
                        onClick={() => setQuantity(quantity <= 1 ? 1 : quantity - 1)}
                    > - </button>   {quantity}
                    <button className="count-btn"
                        onClick={() => setQuantity(quantity + 1)}
                    > + </button>
                    </div>
                    <button
                      onClick={()=>finalCartHandler(singleFood)}
                    className="main-btn  btn-cart"><FontAwesomeIcon className="icon" icon={faCartArrowDown} /> Add </button>
                    
                
                </div>
            </div>
            <div className="img-content">
                <img src={orgImg} alt="" />
            </div>


        </div>
    );
};

export default FoodDetail;
