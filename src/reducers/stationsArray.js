const  INITIAL_STATE = {
  stationsArray: null,
  location: {
    lat: 40.51,
    lng: -100.66,
  },
  zoom: 3
}

const applySetStationsArray = (state, action) => (
  {
    ...state,
  stationsArray: action.stationsArray,
  location: {
    lat: action.stationsArray[0].latitude,
    lng: action.stationsArray[0].longitude,
  },
  zoom: 5
});

function stationsArrayReducer(state = INITIAL_STATE, action) {
  switch(action.type){
    case 'STATIONS_ARRAY_SET': {
      return applySetStationsArray(state, action);
    }
    default:
      return state;
  }
}

export default stationsArrayReducer;