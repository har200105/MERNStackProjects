export const getPostsReducer = (state={posts:[]},action)=>{
    switch(action.type){
        case 'GET_POST_REQ':
            return {
                ...state,
                loading:true
            }
        case 'GET_POST_SUCCESS':
            return {
                posts:action.payload,
                loading:false
            }
        case 'GET_POST_FAIL':
            return {
                error:action.payload,
                loading:false
            }   
        default: return state     
    }
}



export const getUserPostsReducer = (state={posts:[]},action)=>{
    switch(action.type){
        case 'GET_USER_POST_REQ':
            return {
                ...state,
                loading:true
            }
        case 'GET_USER_POST_SUCCESS':
            return {
                posts:action.payload,
                loading:false
            }
        case 'GET_USER_POST_FAIL':
            return {
                error:action.payload,
                loading:false
            }   
        default: return state     
    }
}



