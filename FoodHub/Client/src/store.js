import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { addFoodReducer, getFoodReducer } from './reducers/foodReducer';
import { cartReducer } from './reducers/cartReducer';
import { registerUser } from './reducers/userReducer';
import { loginUser } from './reducers/userReducer';
import { getUserOrderReducer, placeOrderReducer } from './reducers/orderReducer';


const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;

const rootReducer = combineReducers({
    getFoodReducer:getFoodReducer,
    cartReducer:cartReducer,
    registerUser:registerUser,
    loginUser:loginUser,
    placeOrderReducer:placeOrderReducer,
    getUserOrderReducer:getUserOrderReducer,
    addFoodReducer:addFoodReducer
});


const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')): []; 


const initialState = {
    cartReducer:{
        cartItems:cartItems
    },
    loginUser:{
        currentUser:currentUser
    }
};
const middleware = [thunk];


const store = createStore(rootReducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;