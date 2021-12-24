import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { getPostsReducer, getUserPostsReducer } from './redux/reducers/PostReducer';

const rootReducer = combineReducers({
    getPostsReducer:getPostsReducer,
    getUserPostsReducer:getUserPostsReducer
});




const middleware = [thunk];


const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(...middleware)));

export default store;