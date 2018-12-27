const  INITIAL_STATE = {
  stationsArray: null,
}

const applySetStationsArray = (state, action) => (
  {
    ...state,
  stationsArray: action.stationsArray,
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