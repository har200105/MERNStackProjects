export const getFoodReducer = (state={food:[]},action)=>{
    switch(action.type){
        case 'GET_FOOD_REQ':
            return {
                ...state,
                loading:true
            }
        case 'GET_FOOD_SUCCESS':
            return {
                food:action.payload,
                loading:false
            }
        case 'GET_FOOD_FAIL':
            return {
                error:action.payload,
                loading:false
            }   
        default: return state     
    }
}


export const addFoodReducer = (state={food:[]},action)=>{
    switch(action.type){
        case 'ADD_FOOD_REQ':
            return {
                ...state,
                loading:true
            }
        case 'ADD_FOOD_SUCCESS':
            return {
                food:action.payload,
                loading:false
            }
        case 'ADD_FOOD_FAIL':
            return {
                error:action.payload,
                loading:false
            }
        default:
            return state          
    }
}

export const addRestaurantReducer = (state={res:[]},action)=>{
    switch(action.type){
        case 'ADD_RESTAURANT_REQ':
            return{
                ...state,
                loading:true
            }
        case 'ADD_RESTAURANT_SUCCESS':
            return {
                res:action.payload,
                loading:false
            }         
    }
}