const  INITIAL_STATE = {
  stationsArray: null,
  center: [-100.00,  40.51],
  zoom: [2]
}

const applySetStationsArray = (state, action) => (
  {
    ...state,
  stationsArray: action.stationsArray,
  center: [action.stationsArray[0].longitude, action.stationsArray[0].latitude],
  zoom: [5]
});

const applySetStation = (state, action) => (
  {
    ...state,
    center: [action.fuelStation.longitude, action.fuelStation.latitude],
  }
)

function stationsArrayReducer(state = INITIAL_STATE, action) {
  switch(action.type){
    case 'STATIONS_ARRAY_SET': {
      return applySetStationsArray(state, action);
    }
    case 'STATION_SET': {
      return applySetStation(state, action);
    }
    default:
      return state;
  }
}

export default stationsArrayReducer;