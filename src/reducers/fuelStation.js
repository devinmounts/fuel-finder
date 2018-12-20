const INITIAL_STATE = {
  selectedStation: null,
  
}

const applySetStation = (state, action) => ({
  selectedStation: Object.assign({}, {...state.selectedStation}, {...action.fuelStation})
}
);

const applySetStationMessages = (state, action) => ({
  selectedStation: Object.assign({}, {...state.selectedStation}, {messages: action.messages})
});

const applyAddMessage = (state, action) => ({
  selectedStation: Object.assign({}, 
    {...state.selectedStation},
    {messages: state.selectedStation.messages.concat(action.message)} 
    )
});

const applyRemoveMessage = (state, action) => ({
  selectedStation: Object.assign({}, 
    {...state.selectedStation},
    {messages: state.selectedStation.messages.filter(message => message._id !== action._id)} 
    )
});

function fuelStationReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'STATION_SET': {
      return applySetStation(state, action)
    }
    case 'MESSAGES_SET': {
      return applySetStationMessages(state, action);
    }
    case 'MESSAGE_ADD': {
      return applyAddMessage(state, action);
    }
    case 'MESSAGE_REMOVE': {
      return applyRemoveMessage(state, action);
    }
    default:
    return state;
  }
}

export default fuelStationReducer