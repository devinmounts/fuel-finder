import sessionReducer from './session'
import { combineReducers } from 'redux';
import userReducer from './user';
import fuelStationReducer from './fuelStation';
import stationArrayReducer from './stationArray';

const rootReducer = combineReducers({
    sessionState: sessionReducer,
    userState: userReducer,
    stationArray: stationArrayReducer,
    fuelStationState: fuelStationReducer
});

export default rootReducer;