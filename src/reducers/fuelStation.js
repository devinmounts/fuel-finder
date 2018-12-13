const INITIAL_STATE = {
  selectedStation: null,
}

const applySetStation = (state, action) => ({
  selectedStation: Object.assign({}, {...state.selectedStation}, {...action.fuelStation})
}
);

function fuelStationReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'STATION_SET': {
      return applySetStation(state, action)
    }
    default:
    return state;
  }
}

export default fuelStationReducer