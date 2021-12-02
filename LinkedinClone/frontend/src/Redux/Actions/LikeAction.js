import axios from 'axios';
import {API} from '../../API';


export const LikePostAction = (id) => async (dispatch) => {
    try {
        dispatch({type:"LIKING_POST"});
        const response = await axios.put(`${API}/putLike/${id}`, {

        },{
            headers: {
                Authorization:localStorage.getItem("jwt"),
            }
        });
        console.log(response.data);
        dispatch({ type: 'LIKE_POST_SUCCESS', payload: response.data })
    } catch (e) {
        dispatch({ type: 'LIKE_POST_FAIL', payload: e })
    }
}


export const TakeLikePostAction = (id) => async (dispatch) => {
    try {
        dispatch({type:"TAKELIKE_POST"});
        const response = await axios.put(`${API}/takeLike/${id}`,{
            
        } ,{
            headers: {
                "Authorization":localStorage.getItem("jwt"),
            }
        });
        console.log(response.data);
        dispatch({ type: 'TAKELIKE_POST_SUCCESS', payload: response.data })
    } catch (e) {
        dispatch({ type: 'TAKELIKE_POST_FAIL', payload: e })
    }
}