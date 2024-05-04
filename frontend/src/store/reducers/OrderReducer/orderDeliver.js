import * as actionTypes from "../../actions/actionTypes";

const initialState = {};

const orderDeliver = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_DELIVER_REQUEST:
            return {
                loading: true
            };
        case actionTypes.ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case actionTypes.ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error: action.error
            };
        case actionTypes.ORDER_DELIVER_RESET:
            return {};
        default:
            return state;
    }
};

export default orderDeliver;
