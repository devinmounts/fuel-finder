const  INITIAL_STATE = {
  stationsArray: null,
  location: [-100.00,  40.51],
  zoom: [2]
}

const applySetStationsArray = (state, action) => (
  {
    ...state,
  stationsArray: action.stationsArray,
  location: [action.stationsArray[0].longitude, action.stationsArray[0].latitude],
  zoom: [5]
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