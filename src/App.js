import React, { useState, useEffect } from 'react';
import './App.css';
import TopHeader from './components/TopHeader/TopHeader';
import Banner from './components/Banner/Banner';
import Food from './components/Food/Food';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import FoodDetail from './components/FoodDetail/FoodDetail';
import { getDatabaseCart, addToDatabaseCart, removeFromDatabaseCart, processOrder } from './utilities/databaseManager';
import fakeData from './fakeData';
import Shipment from './components/Shipment/Shipment';
import { AuthContextProvider, PrivateRoute } from './components/SignUp/useAuth';
import SignUp from './components/SignUp/SignUp';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';
import NotFound from './components/NotFound/NotFound';




function App() {
  const [cart, setCart]=useState([]);
  const [deliveryDetails , setDeliveryDetails] = useState({
    todoor:null,road:null, flat:null, businessname:null, address: null
  });
  const [orderPlaced, setOrderPlaced]=useState(false);
    const handlePlaceOrder= ()=>{
        //console.log('order placed');
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

  const [userEmail, setUserEmail] = useState(null);
  const deliveryDetailsHandler = (data) => {
      setDeliveryDetails(data)
  }
  const getUserEmail = (email) => {
    setUserEmail(email)
  }



    useEffect(()=>{
      const savedCart= getDatabaseCart();
      const foodKey= Object.keys(savedCart);
      const cartFoods= foodKey.map(key=>{
        const foods =fakeData.find(food=> food.key===key);
        foods.quantity=savedCart[key];
        //console.log(foods.quantity)
        return foods;
      })
      setCart(cartFoods)
    },[]);
   

    
    const cartHandler =(product)=>{
      console.log('product added', product)
      const alreadyAdded= cart.find(crt=>crt.key===product.key);
      const newCart=[...cart,product];
      setCart(newCart);
      if(alreadyAdded){
        const remainingCart=cart.filter(crt=>crt.key !==product);
        setCart(remainingCart);
      }else{
        const newCart=[...cart, product];
        setCart(newCart)
      }
      addToDatabaseCart(product)
    }


  const checkOutItemHandler = (productKey, productQuantity) => {
    const newCart = cart.map(item => {
      //console.log(item.key, productKey)
      if(item.key === productKey){
          item.quantity = productQuantity;
      }
      return item;
    })

    const filteredCart = newCart.filter(item => item.quantity > 0)
    setCart(filteredCart)
  }


  const removedProduct= (productKey)=>{
    const newCart= cart.filter(item=> item.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey)
}

  

    
  
  return (
    <div>
       
     <AuthContextProvider>  
       <Router>
         <Switch>
           <Route exact path="/">
           <TopHeader cart={cart} ></TopHeader>
             <Banner></Banner>
             <Food cart={cart} ></Food>
           </Route>
           <PrivateRoute path="/shipment">
           <TopHeader cart={cart} ></TopHeader>
             <Shipment handlePlaceOrder={handlePlaceOrder}
             orderPlaced={orderPlaced} 
             removedProduct={removedProduct}
             userEmail={userEmail}  checkOutItemHandler={checkOutItemHandler}
             deliveryDetails={deliveryDetails} deliveryDetailsHandler={deliveryDetailsHandler}
             getUserEmail={getUserEmail}
             cart={cart} ></Shipment>
           </PrivateRoute>
           <Route path="/food/:foodKey">
           <TopHeader cart={cart} ></TopHeader>
             <FoodDetail cartHandler={cartHandler} setCart={setCart}  cart={cart} ></FoodDetail>
           </Route>
           <Route path="/placeOrder">
             <TopHeader cart={cart} ></TopHeader>
             <PlaceOrder></PlaceOrder>
             
           </Route>
           <Route path="/login">
                <TopHeader cart={cart} ></TopHeader>
                <SignUp></SignUp>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
         </Switch>
       </Router>    
       </AuthContextProvider>       
           
           
         
    </div>
    
  );
}

    
  
 

 




export default App;
