import sessionReducer from './session'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    sessionSate: sessionReducer 
});

export default rootReducer;