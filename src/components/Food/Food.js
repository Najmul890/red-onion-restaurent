import React from 'react';
import './Food.css';
import fakeData from '../../fakeData';
import { useState } from 'react';
import FoodItem from '../FoodItem/FoodItem';
import { Link } from 'react-router-dom';



const Food = (props) => {
    const foodItem = fakeData;
    const [foods, setFoods]= useState(foodItem);
    const [category, setCategory]=useState("breakfast");

    const food= foods.filter(pd=> pd.category=== category);
    
    
    return (
        <div className="food" >
            <h2>Our Food Items </h2>
            <div>
            <ul>
                <li className={category === "breakfast" ? "selected-item" : "item" }
                  onClick={()=> setCategory("breakfast")}
                >BreakFast</li>
                <li className={category === "lunch" ? "selected-item" : "item" }
                 onClick= {()=> setCategory("lunch")}
                >Lunch</li>
                <li className={category === "dinner" ? "selected-item" : "item" }
                 onClick= {()=> setCategory("dinner")}
                >Dinner</li>
            </ul>
            </div><br/><br/><br/>
            <div>
            <div className="food-box">
            {
                food.map(pd => <FoodItem
                     key={pd.key} 
                    product={pd } ></FoodItem> )
            }
            
            </div>
            <div className="shipping">
                    {
                        props.cart.length ? 
                        <Link to="/shipment">
                            <button  className="checkout">Check Out Your Food</button>
                        </Link>
                        :
                        <button disabled className="checkout nothing">Check Out Your Food</button>

                    }

                </div>
            </div>
            
        </div>
    );
};

export default Food;