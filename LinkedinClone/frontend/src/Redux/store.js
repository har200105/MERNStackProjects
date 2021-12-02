import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { LikePostReducer, TakeLikePostReducer } from './Reducer/LikeReducer';


const rootReducer = combineReducers({
    LikePostReducer:LikePostReducer,
    TakeLikePostReducer:TakeLikePostReducer
});

const initialState={};

const middleware = [thunk];

const store = createStore(rootReducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));
export default store;