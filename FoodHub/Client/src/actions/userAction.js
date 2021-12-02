import axios from "axios"
import { useHistory } from "react-router";
import { API } from "../API";

export const signUp = (user) =>async(dispatch)=>{
    dispatch({type:'USER_SIGNUP'});
    try{
        const response = await axios.post(`${API}/auth/register`,user)
        dispatch({type:'USER_SIGNUP_SUCCESS'});
    }catch(e){
       dispatch({type:'USER_REGISTER_ERROR',payload:e}) 
    }
}


export const login = (user)=>async(dispatch)=>{
    dispatch({type:"USER_LOGIN_REQUEST"});
    try{
        const response = await axios.post(`${API}/auth/login`,user);
        dispatch({type:"USER_LOGIN_SUCCESS",payload:response.data});
        localStorage.setItem("currentUser",JSON.stringify(response.data));
        const history = useHistory();
        history.push('/');

    }catch(e){
        dispatch({type:'USER_LOGIN_ERROR',payload:e})    
    }
}