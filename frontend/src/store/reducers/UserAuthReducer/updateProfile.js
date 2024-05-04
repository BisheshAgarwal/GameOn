import * as actionTypes from "../../actions/actionTypes";

const initialState = {};

const updateProfile = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_UPDATE_REQUEST:
            return {
                loading: true
            };
        case actionTypes.USER_UPDATE_SUCCESS:
            return { loading: false, success: true, userInfo: action.userInfo };
        case actionTypes.USER_UPDATE_FAIL:
            return { loading: false, error: action.error };
        case actionTypes.USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state;
    }
};

export default updateProfile;
