import axios from 'axios';
import { API } from '../API';

export const login = async(userdetails,dispatch) =>{
    dispatch({type:"LOGIN_START"});
    try{
        const res = await axios.post(`${API}/login`,userdetails);
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    }catch(e){
        dispatch({type:"LOGIN_SUCCESS",payload:e})
    }
}