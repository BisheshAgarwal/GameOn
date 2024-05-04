import * as actionTypes from "../../actions/actionTypes";

const initialState = {};

const orderPay = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_PAY_REQUEST:
            return {
                loading: true
            };
        case actionTypes.ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case actionTypes.ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.error
            };
        case actionTypes.ORDER_PAY_RESET:
            return {};
        default:
            return state;
    }
};

export default orderPay;
