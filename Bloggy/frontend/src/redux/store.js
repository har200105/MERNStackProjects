import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {getPostCatReducer, getPostReducer } from './reducers/postReducer';

const rootReducer = combineReducers({
    getPostReducer:getPostReducer,
    getPostCatReducer:getPostCatReducer
});

const initialState ={

};

const middleware = [thunk];

const store = createStore(rootReducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));
export default store;