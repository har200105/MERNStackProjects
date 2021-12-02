export const cartReducer = (state={cartItems:[]},action)=>{
    switch(action.type){
        case'ADD_TO_CART':
        const alreadyInCart =state.cartItems.find(item=>item._id===action.payload._id)
        if(alreadyInCart){
            return {
                ...state,
                cartItems:state.cartItems.map(item=>item._id===action.payload._id ? action.payload : item)
            }
        }else{
            return {
                ...state,
                cartItems:[...state.cartItems,action.payload]
            }
        }

        case 'DELETE_FROM_CART':
            return {
                ...state,
                cartItems:state.cartItems.filter(i=>i._id !== action.payload._id)
            }

        default:return state;
    }
}