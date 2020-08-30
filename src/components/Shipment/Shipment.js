import React from 'react';
import './Shipment.css';
import { useAuth } from '../SignUp/useAuth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Shipment = (props) => {

    const auth = useAuth();
    const { register, handleSubmit, watch, errors } = useForm()
    const onSubmit = data => {
        props.deliveryDetailsHandler(data);
        props.getUserEmail(auth.user.email);
    };
    const { todoor, road, flat, businessname, address } = props.deliveryDetails;


    console.log(props)
    const subTotal = props.cart.reduce((total, food) => {
        return total + (food.price * food.quantity);

    }, 0)
    //console.log(subTotal)
    const totalQuantity = props.cart.reduce((total, food) => {
        return total + food.quantity;
    }, 0)
    const delivery = 5;
    const grandTotal = subTotal + delivery;






    return (


        <div className="shipment" >
            <div className="form-box">
                <div className="row">
                    <div style={{ display: (todoor && road && flat && businessname && address) ? "none" : "block" }} className="col-md-5">
                        <h4> Delivery Details</h4>
                        <hr />
                        <form onSubmit={handleSubmit(onSubmit)} className="py-5">

                            <div className="form-group">
                                <input name="todoor" className="form-control" ref={register({ required: true })} defaultValue={todoor} placeholder="Delivery To Door" />
                                {errors.todoor && <span className="error">This Option is required</span>}
                            </div>
                            <div className="form-group">
                                <input name="road" className="form-control" ref={register({ required: true })} defaultValue={road} placeholder="Road No" />
                                {errors.road && <span className="error">Road No is required</span>}
                            </div>
                            <div className="form-group">
                                <input name="flat" className="form-control" ref={register({ required: true })} defaultValue={flat} placeholder="Flat, Suite or Floor" />
                                {errors.flat && <span className="error">Flat, Suite or Floor is required</span>}
                            </div>
                            <div className="form-group">
                                <input name="businessname" className="form-control" ref={register({ required: true })} defaultValue={businessname} placeholder="Business name" />
                                {errors.businessname && <span className="error">Business name is required</span>}
                            </div>
                            <div className="form-group">
                                <textarea name="address" ref={register({ required: true })} placeholder="Address" className="form-control" cols="30" rows="2">{address}</textarea>
                                {errors.address && <span className="error">Address is required</span>}
                            </div>

                            <div className="form-group">

                                <button>save and continue</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className={(todoor && road && flat && businessname && address) ? "full-width" : "count-box"}
            >
                <h2>Your product details</h2>
                <p> Your added product <span className="cart" >{props.cart.length} </span> </p>

                {
                    props.cart.map(item =>
                        //console.log(item.quantity)
                        <div className="single-item">
                            <img style={{ width: '100px' }} src={item.img} alt="" />

                            <div>
                                <h6>{item.name}</h6>
                                <h4 className="text-danger">${item.price.toFixed(2)}</h4>

                            </div>
                            <div className="checkout-item">
                                <button onClick={() => props.checkOutItemHandler(item.key, (item.quantity + 1))} className="btn">+</button>
                                <button className="btn">{item.quantity}</button>

                                {
                                    item.quantity > 0 ?
                                        <button className="btn-count" onClick={() => props.checkOutItemHandler(item.key, (item.quantity - 1))}>-</button>
                                        :

                                        <button disabled className="btn-count" onClick={() => props.removedProduct(item.key)} >-</button>

                                }

                                <button onClick={() => props.removedProduct(item.key)} >remove</button>

                            </div>
                        </div>
                    )
                }


                <p className=""><span>Sub Total of {totalQuantity} Item</span> <span>${subTotal.toFixed(2)}</span></p>

                {
                    props.cart.length &&
                    <div>
                        <p>Delivery Charge: $5 </p>
                        <p className=""><span>Total</span> <span>${grandTotal.toFixed(2)}</span></p>
                    </div>
                }

                {

                    <div style={{ display: (todoor && road && flat && businessname && address) ? "block" : "none" }} >
                        <Link to="/placeOrder" >
                            <button className="checkout" type="submit"
                            onClick={()=>props.handlePlaceOrder(props.orderPlaced)}

                            >Place Order</button>
                        </Link>
                    </div>
                }


            </div>





        </div>
    );
};

export default Shipment;
