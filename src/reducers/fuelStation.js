const INITIAL_STATE = {
  selectedStation: {},
}

const applySetStation = (state, action) => ({
  selectedStation: Object.assign({}, {...state.selectedStation}, {...action.fuelStation})
}
);

function fuelStationReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'STATION_SET': {
      console.log('in case')
      return applySetStation(state, action)
    }
    default:
    return state;
  }
}

export default fuelStationReducer