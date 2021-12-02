export const addToCart = (food,quantity,varient)=>(dispatch,getState)=>{
    var cartItem={
        foodname:food.foodname,
        _id:food._id,
        foodImageimage:food.foodImage,
        varient:varient,
        quantity:Number(quantity),
        foodprice:food.foodprice,
        currPrice:food.foodprice[0][varient]*quantity
    };

    if(cartItem.quantity > 10){
        alert("You can add only 10 plates")
    }
    else{
        if(cartItem.quantity<1){
            dispatch({type:'DELETE_FROM_CART',payload:food});
        }else{
            dispatch({type:'ADD_TO_CART',payload:cartItem});
            localStorage.setItem('cartItems',JSON.stringify(getState().cartReducer.cartItems))
        }
    }


}

export const deleteFromCart = (food) =>(dispatch,getState)=>{
    dispatch({type:'DELETE_FROM_CART',payload:food});
    const cartItems = getState().cartReducer.cartItems;
    localStorage.setItem('cartItems',JSON.stringify(cartItems))
}