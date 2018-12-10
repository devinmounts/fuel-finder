import sessionReducer from './session'
import { combineReducers } from 'redux';
import userReducer from './user';

const rootReducer = combineReducers({
    sessionState: sessionReducer,
    userState: userReducer 
});

export default rootReducer;