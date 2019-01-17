import sessionReducer from './session'
import { combineReducers } from 'redux';
import userReducer from './user';
import fuelStationReducer from './fuelStation';
import stationsArrayReducer from './stationsArray';

const rootReducer = combineReducers({
    sessionState: sessionReducer,
    userState: userReducer,
    stationsArrayState: stationsArrayReducer,
    fuelStationState: fuelStationReducer
});

export default rootReducer;