export const registerUser = (state = {}, action) => {
    switch (action.type) {
        case 'USER_SIGNUP':
            return {
                loading: true
            }
        case 'USER_SIGNUP_SUCCESS':
            return {
                loading: false,
                success: true
            }
        case 'USER_REGISTER_ERROR':
            return {
                loading: false,
                error: action.payload
            }
        default:
            return { state };
    }
}

export const loginUser = (state = {}, action) => {
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return {
                loading: true
            }
        case 'USER_LOGIN_SUCCESS':
            return {
                loading: false,
                success: true,
                currentUser: action.payload
            }
        case 'USER_LOGIN_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        default:
            return { state }
    }
}