import sessionReducer from './session'
import { combineReducers } from 'redux';
import userReducer from './user';
import fuelStationReducer from './fuelStation';

const rootReducer = combineReducers({
    sessionState: sessionReducer,
    userState: userReducer,
    fuelStationState: fuelStationReducer
});

export default rootReducer;