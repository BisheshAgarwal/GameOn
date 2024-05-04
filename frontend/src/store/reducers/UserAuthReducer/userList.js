import * as actionTypes from "../../actions/actionTypes";

const initialState = {
    users: []
};

const userList = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LIST_REQUEST:
            return {
                loading: true
            };
        case actionTypes.USER_LIST_SUCCESS:
            return {
                loading: false,
                users: action.users
            };
        case actionTypes.USER_LIST_FAIL:
            return {
                loading: false,
                error: action.error
            };
        case actionTypes.USER_LIST_RESET:
            return {
                users: []
            };
        default:
            return state;
    }
};

export default userList;
