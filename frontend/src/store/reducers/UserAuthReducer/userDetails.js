import * as actionTypes from "../../actions/actionTypes";

const initialState = {
    user: {}
};

const userDetails = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.user
            };
        case actionTypes.USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.error
            };
        case actionTypes.USER_DETAILS_RESET:
            return {
                user: {}
            };
        default:
            return state;
    }
};

export default userDetails;
