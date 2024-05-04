import * as actionTypes from "../../actions/actionTypes";

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userInfo: userInfoFromStorage
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_REQUEST:
      return { loading: true }
    case actionTypes.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case actionTypes.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case actionTypes.USER_LOGOUT:
      return {}
    default:
      return state
  }
};

export default login;
