import { API } from '../../API';
import axios from 'axios';

export const getPosts = () => {
    dispatch({ type: 'GET_POST_REQ' });
    try {
        const response = await axios.get(`${API}/getTimeLinePosts`, {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        });
        console.log(response.data);
        dispatch({ type: 'GET_POST_SUCCESS', payload: response.data })
    } catch (e) {
        dispatch({ type: 'GET_POST_FAIL', payload: e })
    }
}


export const getUserPosts = (id) => {
    dispatch({ type: 'GET_USER_POST_REQ' });
    try {
        const response = await axios.get(`${API}/getUserPosts/${id}`, {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        });
        console.log(response.data);
        dispatch({ type: 'GET_USER_POST_SUCCESS', payload: response.data })
    } catch (e) {
        dispatch({ type: 'GET_USER_POST_FAIL', payload: e })
    }
}