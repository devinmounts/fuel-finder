import sessionReducer from './session'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    sessionState: sessionReducer 
});

export default rootReducer;