import * as actionTypes from "../../actions/actionTypes";

const initialState = {};

const orderCreate = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_CREATE_REQUEST:
            return {
                loading: true
            };
        case actionTypes.ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.order
            };
        case actionTypes.ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.error
            };
        case actionTypes.ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export default orderCreate;
