import constants from '../constants';
const { types, INITIAL_STATE} = constants
import

const userAuthReducer = (state = INITIAL_STATE.authUser, action) => {
  switch(action.type) {
    case types.CREATE_USER_WITH_EMAIL_AND_PASSWORD:
      return
    default:
      return state;
  }
};

export default userAuthReducer;