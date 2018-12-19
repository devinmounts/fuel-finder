const INITIAL_STATE = {
  selectedStation: null,
  
}

const applySetStation = (state, action) => ({
  selectedStation: Object.assign({}, {...state.selectedStation}, {...action.fuelStation})
}
);

const applySetStationMessages = (state, action) => ({
  selectedStation: Object.assign({}, {...state.selectedStation}, {messages: action.messages} )
});

function fuelStationReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'STATION_SET': {
      return applySetStation(state, action)
    }
    case 'MESSAGES_SET': {
      return applySetStationMessages(state, action);
    }
    default:
    return state;
  }
}

export default fuelStationReducer