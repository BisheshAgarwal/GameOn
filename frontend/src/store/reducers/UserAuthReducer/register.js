import * as actionTypes from "../../actions/actionTypes";

const initialState = {};

const register = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_REGISTER_REQUEST:
            return {
                loading: true
            };
        case actionTypes.USER_REGISTER_SUCCESS:
            return {
                loading: false,
                userInfo: action.userInfo
            };
        case actionTypes.USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.error
            };
        case actionTypes.USER_REGISTER_RESET:
            return {};
        default:
            return state;
    }
};

export default register;
