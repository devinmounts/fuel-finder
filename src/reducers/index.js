import userAuthReducer from './userAuthReducer'
import combineReducers from 'redux';

const rootReducer = combineReducers({
    authUser: userAuthReducer 
});

export default rootReducer;