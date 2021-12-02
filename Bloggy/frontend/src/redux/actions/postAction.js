import axios from 'axios';
import { API } from '../../API';

export const getAllPosts = () => async(dispatch)=>{
    dispatch({type:'GET_POSTS_REQ'});
    try{
        const response = await axios.get(`${API}/getPost`);
        console.log(response.data);
        dispatch({type:'GET_POSTS_SUCCESS',payload:response.data})
    }catch(e){
        dispatch({type:'GET_POSTS_FAIL',payload:e})
    }
}


export const getPostsByCat = (id) => async(dispatch)=>{
    console.log(id)
    dispatch({type:'GET_POSTS_CAT_REQ'});
    try{
        const response = await axios.get(`${API}/getPost/?category=${id}`);
        console.log(response.data);
        dispatch({type:'GET_POSTS_CAT_SUCCESS',payload:response.data})
    }catch(e){
        dispatch({type:'GET_POSTS_CAT_FAIL',payload:e})
    }
}

export const getSinglePost = (id) =>async(dispatch) =>{
    console.log(id)
    dispatch({type:'GET_POSTS_SINGLE_REQ'});
    try{
        const response = await axios.get(`${API}/getSinglePost/${id}`);
        console.log(response.data);
        dispatch({type:'GET_POSTS_SINGLE_SUCCESS',payload:response.data})
    }catch(e){
        dispatch({type:'GET_POSTS_SINGLE_FAIL',payload:e})
    }
}
