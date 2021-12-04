import axios from 'axios';
import { API } from '../API';

export const login = async(userdetails,dispatch) =>{
    dispatch({type:"LOGIN_START"});
    try{
        const res = await axios.post(`${API}/login`,userdetails);
       
            localStorage.setItem("jwt",res.data.token);
            
            dispatch({type:"LOGIN_SUCCESS",payload:res.data.user});
            await axios.put(`${API}/makeUserOnline`,{},{
                headers:{
                    "Authorization":localStorage.getItem("jwt")
                }
            }).then(()=>{
                console.log("Online")
            })
    }catch(e){
        dispatch({type:"LOGIN_FAILURE",payload:e})
    }
}