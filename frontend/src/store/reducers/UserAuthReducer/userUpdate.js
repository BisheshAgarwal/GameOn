import * as actionTypes from "../../actions/actionTypes";

const initialState = {};

const userUpdate = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_ADMIN_UPDATE_REQUEST:
      return { loading: true }
    case actionTypes.USER_ADMIN_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case actionTypes.USER_ADMIN_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case actionTypes.USER_ADMIN_UPDATE_RESET:
      return {
        user: {},
      }
    default:
      return state
  }
};

export default userUpdate;