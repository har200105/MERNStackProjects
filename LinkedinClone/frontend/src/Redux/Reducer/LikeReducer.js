export const LikePostReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case "LIKING_POST":
            return {
                loading: true,
                error: false
            }
        case "LIKE_POST_SUCCESS":
            return {
                posts: action.payload,
                loading: false,
            }
        case "LIKE_POST_FAIL":
            return {
                error: action.payload,
                loading: false,
            }
        default:
            return state;
    }
}

export const TakeLikePostReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case "TAKELIKE_POST":
            return {
                loading: true,
                error: false
            }
        case "TAKELIKE_POST_SUCCESS":
            return {
                posts: action.payload,
                loading: false,
            }
        case "TAKELIKE_POST_FAIL":
            return {
                error: action.payload,
                loading: false,
            }
        default:
            return state;
    }
};


