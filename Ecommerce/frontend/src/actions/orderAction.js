import axios from "axios";
import { API } from "../API";

// Create Order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: 'CREATE_ORDER_REQUEST' });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization":localStorage.getItem("token")
      },
    };
    const { data } = await axios.post(`${API}/api/v1/order/new`, order, config);

    dispatch({ type: 'CREATE_ORDER_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'CREATE_ORDER_FAIL',
      payload: error.response.data.message,
    });
  }
};

// My Orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: 'MY_ORDERS_REQUEST' });

    const { data } = await axios.get(`${API}/api/v1/orders/me`, {
      headers: {
        "Authorization":localStorage.getItem("token")
      }
    });

    dispatch({ type: 'MY_ORDERS_SUCCESS', payload: data.orders });
  } catch (error) {
    dispatch({
      type: 'MY_ORDERS_FAIL',
      payload: error.response.data.message,
    });
  }
};

// Get All Orders (admin)
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: 'ALL_ORDERS_REQUEST' });

    const { data } = await axios.get(`${API}/api/v1/admin/orders`, {
      headers: {
        "Authorization":localStorage.getItem("token")
      }
    });

    dispatch({ type: 'ALL_ORDERS_SUCCESS', payload: data.orders });
  } catch (error) {
    dispatch({
      type: 'ALL_ORDERS_FAIL',
      payload: error.response.data.message,
    });
  }
};

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: 'UPDATE_ORDER_REQUEST' });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization":localStorage.getItem("token")
      },
    };
    const { data } = await axios.put(
      `${API}/api/v1/admin/order/${id}`,
      order,
      config
    );

    dispatch({ type: 'UPDATE_ORDER_SUCCESS', payload: data.success });
  } catch (error) {
    dispatch({
      type: 'UPDATE_ORDER_FAIL',
      payload: error.response.data.message,
    });
  }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'DELETE_ORDER_REQUEST' });

    const { data } = await axios.delete(`${API}/api/v1/admin/order/${id}`, {
      headers: {
        "Authorization":localStorage.getItem("token")
      }
    });

    dispatch({ type: 'DELETE_ORDER_SUCCESS', payload: data.success });
  } catch (error) {
    dispatch({
      type: 'DELETE_ORDER_FAIL',
      payload: error.response.data.message,
    });
  }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'ORDER_DETAILS_REQUEST' });

    const { data } = await axios.get(`${API}/api/v1/order/${id}`, {
      headers: {
        "Authorization":localStorage.getItem("token")
      }
    });

    dispatch({ type: 'ORDER_DETAILS_SUCCESS', payload: data.order });
  } catch (error) {
    dispatch({
      type: 'ORDER_DETAILS_FAIL',
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_ERRORS' });
};
