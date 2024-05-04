import * as actionTypes from "../../actions/actionTypes";

const initialState = {};

const userDelete = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_DELETE_REQUEST:
            return {
                loading: true
            };
        case actionTypes.USER_DELETE_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case actionTypes.USER_DELETE_FAIL:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default userDelete;
