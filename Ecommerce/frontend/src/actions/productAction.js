import axios from "axios";
import { API } from "../API";


// Get All Products
export const getProduct =
  (keyword = "", currentPage = 0, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: 'ALL_PRODUCT_REQUEST' });

      let link = `${API}/api/v1/products?keyword=${keyword}&page=${0}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `${API}/api/v1/products?keyword=${keyword}&page=${0}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link, {
        headers: {
          "Authorization":localStorage.getItem("token")
        }
      });
      console.log(data);

      dispatch({
        type: 'ALL_PRODUCT_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'ALL_PRODUCT_FAIL',
        payload: error.response.data.message,
      });
    }
  };

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: 'ADMIN_PRODUCT_REQUEST' });

    const { data } = await axios.get(`${API}/api/v1/admin/products`, {
      headers: {
        "Authorization":localStorage.getItem("token")
      }
    });

    dispatch({
      type: 'ADMIN_PRODUCT_SUCCESS',
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: 'ADMIN_PRODUCT_FAIL',
      payload: error.response.data.message,
    });
  }
};

// Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: 'NEW_PRODUCT_REQUEST' });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
    };

    const { data } = await axios.post(
      `${API}/api/v1/admin/product/new`,
      productData,
      config
    );

    dispatch({
      type: 'NEW_PRODUCT_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'NEW_PRODUCT_FAIL',
      payload: error.response.data.message,
    });
  }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: 'UPDATE_PRODUCT_REQUEST' });

    const config = {
      headers: { "Content-Type": "application/json","Authorization":localStorage.getItem("token") },
    };

    const { data } = await axios.put(
      `${API}/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: 'UPDATE_PRODUCT_SUCCESS',
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: 'UPDATE_PRODUCT_FAIL',
      payload: error.response.data.message,
    });
  }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'DELETE_PRODUCT_REQUEST' });

    const { data } = await axios.delete(`${API}/api/v1/admin/product/${id}`, {
      headers: {
        "Authorization":localStorage.getItem("token")
      }
    });

    dispatch({
      type: 'DELETE_PRODUCT_SUCCESS',
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: 'DELETE_PRODUCT_FAIL',
      payload: error.response.data.message,
    });
  }
};

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_DETAILS_REQUEST' });

    const { data } = await axios.get(`${API}/api/v1/product/${id}`);

    dispatch({
      type: 'PRODUCT_DETAILS_SUCCESS',
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_DETAILS_FAIL',
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: 'NEW_REVIEW_REQUEST' });

    const config = {
      headers: { "Content-Type": "application/json","Authorization":localStorage.getItem("token") },
    };

    const { data } = await axios.put(`${API}/api/v1/review`, reviewData, config);

    dispatch({
      type: 'NEW_REVIEW_SUCCESS',
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: 'NEW_REVIEW_FAIL',
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'ALL_REVIEW_REQUEST' });

    const { data } = await axios.get(`${API}/api/v1/reviews?id=${id}`, {
      headers: {
        "Authorization":localStorage.getItem("token")
      }
    });

    dispatch({
      type: 'ALL_REVIEW_SUCCESS',
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: 'ALL_REVIEW_FAIL',
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: 'DELETE_REVIEW_REQUEST' });

    const { data } = await axios.delete(
      `${API}/api/v1/reviews?id=${reviewId}&productId=${productId}`,
      {
        headers: {
          "Authorization":localStorage.getItem("token")
        }
      }
    );

    dispatch({
      type: 'DELETE_REVIEW_SUCCESS',
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: 'DELETE_REVIEW_FAIL',
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_ERRORS' });
};
