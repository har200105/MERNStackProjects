import axios from 'axios';
import { API } from '../API';

export const placeOrder = (token, total) => async (dispatch, getState) => {
    dispatch({ type: 'PLACE_ORDER_REQUEST' });
    const currentUser = getState().loginUser.currentUser;
    const cartItems = getState().currentUser.cartItems;

    try {
        const response = await axios.post(`${API}/api/addOrder`, { token, total, currentUser, cartItems });
        dispatch({ type: "PLACE_ORDER_SUCCESS" });
    } catch (e) {
        dispatch({ type: "PLACE_ORDER_FAIL" });
        console.log(e)
    }
}

export const getUserOrders = () => async (dispatch, getState) => {
    const currentUser = getState().loginUser.currentUser;

    dispatch({
        type: 'USER_ORDER_REQUEST'
    });
    try {
        const response = await axios.get(`${API}/api/orderuser`);
        console.log(response);
        dispatch({ type: 'USER_ORDER_SUCCESS', payload: response.data });

    } catch (e) {
        dispatch({ type: 'USER_ORDER_FAIL', error: e });
        console.log(e)
    }
}