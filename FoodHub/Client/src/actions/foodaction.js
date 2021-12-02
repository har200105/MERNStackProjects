import axios from 'axios';
import { API } from '../API';

export const getAllFoods = () => async(dispatch)=>{
    dispatch({type:'GET_FOOD_REQ'});
    try{
        const response = await axios.get(`${API}/getFood`);
        console.log(response.data);
        dispatch({type:'GET_FOOD_SUCCESS',payload:response.data})
    }catch(e){
        dispatch({type:'GET_FOOD_FAIL',payload:e})
    }
}

export const addFood = (food) => async(dispatch)=>{
    dispatch({type:'ADD_FOOD_REQ'});
    try{
        const response = await axios.post(`${API}/addFood`,{food},{
            headers:{

            }
        });
        console.log(response.data);
        dispatch({type:'ADD_FOOD_SUCCESS',payload:response.data})
    }catch(e){
        dispatch({type:'ADD_FOOD_FAIL',payload:e})
    }
}

export const addRestaurant = (restaurant) => async(dispatch) =>{
    dispatch({type:'ADD_RESTAURANT_REQ'});
    try{
        const response = await axios.post(`${API}/addRestaurant`,{restaurant},{
            headers:{

            }
        });
        console.log(response.data);
        dispatch({type:'ADD_RESTAURANT_SUCCESS',payload:response.data})

    }catch(e){

    }
}
