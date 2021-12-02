export const getPostReducer = (state={posts:[]},action)=>{
    switch(action.type){
        case 'GET_POSTS_REQ':
            return {
                ...state,
                loading:true
            }
        case 'GET_POSTS_SUCCESS':
            return {
                posts:action.payload,
                loading:false
            }
        case 'GET_POSTS_FAIL':
            return {
                error:action.payload,
                loading:false
            }   
        default: return state     
    }
}


export const getPostCatReducer = (state={posts:[]},action)=>{
    switch(action.type){
        case 'GET_POSTS_CAT_REQ':
            return {
                ...state,
                loading:true
            }
        case 'GET_POSTS_CAT_SUCCESS':
            return {
                posts:action.payload,
                loading:false
            }
        case 'GET_POSTS_CAT_FAIL':
            return {
                error:action.payload,
                loading:false
            }   
        default: return state     
    }
}