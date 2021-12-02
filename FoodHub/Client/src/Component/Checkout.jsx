import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { placeOrder } from '../actions/orderAction';



const Checkout = ({totalAmount}) => {
    const orderState = useSelector(state=>state.placeOrderReducer);
    const{loading,error,success} = orderState;
    const dispatch = useDispatch();

const tokenHandler=(token)=>{
    dispatch(placeOrder(token,totalAmount));
    console.log(token);
}
    return (
        <StripeCheckout
        shippingAddress
        amount={totalAmount}
        token={tokenHandler}
        stripeKey="pk_test_51JkRMBSBeKl8WkWItc8FO9xH1JR2dr1OirUaA8ddTg8BQGOsJoTs2Ahmw6byL88bvCbhr8rbbXIeEaZCzYXFhc0H00voNs1HVP"
        currency="INR"
        >
            <Button>Pay Now</Button>

        </StripeCheckout>
    )
}

export default Checkout
