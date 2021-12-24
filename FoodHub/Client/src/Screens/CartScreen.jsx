import React from 'react'
import { Container, Row, Col, NavItem, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {FaMinusCircle} from 'react-icons/fa';
import {FaPlusCircle,FaTrash} from 'react-icons/fa';
import { addToCart,deleteFromCart } from '../actions/cartAction';
import Checkout from '../Component/Checkout';

const CartScreen = () => {
    const cartState = useSelector(state => state.cartReducer);
    const cartItems = cartState.cartItems;
    const subTotal = cartItems.reduce((x,i)=>x+i.currPrice,0)
    console.log(cartItems)
    const dispatch = useDispatch();
    return (
        <>
            <Container>
                <Row>
                    <Col md={6}>
                        <h1>
                            Your Cart
                        </h1>
                        <Row>
                            

                            {cartItems.map((food, index) => (
                    
                                <>
                                    <Col md={7}>
                                        <h5>{food.foodname} ({food.varient}) </h5>
                                        <h6>Price : {food.quantity} X {food.foodprice[0][food.varient]} = ₹ {food.currPrice} </h6>
                                        <h6>
                                            Quantity:&nbsp;
                                            <FaMinusCircle className="text-danger"
                                            style={{cursor:'pointer'}}
                                            onClick={()=>dispatch(addToCart(food,food.quantity-1,food.varient))}
                                            /> &nbsp;
                                            {food.quantity}  &nbsp;
                                            <FaPlusCircle className="text-success"
                                                style={{cursor:'pointer'}}
                                                onClick={()=>dispatch(addToCart(food,food.quantity+1,food.varient))} 
                                            />
                                        </h6>
                                    </Col>

                                    <Col md={5}>
                                        <img 
                                        alt ={food.foodname} 
                                        src={food.foodImage}
                                        style={{width:'80px',height:'80px'}}
                                        />
                                        <FaTrash
                                        className="text-danger"
                                        style={{cursor:'pointer',marginLeft:"20px"}}
                                        onClick={()=>dispatch(deleteFromCart(food))}
                                        />
                                    </Col>
                                    <hr/>
                                </>
                            ))}

                        </Row>
                    </Col>
                    <Col md={4}>
                        <h1>Delivery Details</h1>
                        <h1>Rs {subTotal} /-</h1>
                        <Button>Checkout</Button>
                        <Checkout/>
                        <Button style={{
                            marginLeft:"10px"
                        }}>Cash on Delivery</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CartScreen
