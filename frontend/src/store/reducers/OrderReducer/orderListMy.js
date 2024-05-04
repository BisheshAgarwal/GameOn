import * as actionTypes from "../../actions/actionTypes";

const initialState = {
    orders: []
};

const orderListMy = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_LIST_MY_REQUEST:
            return {
                loading: true
            };
        case actionTypes.ORDER_LIST_MY_SUCCESS:
            return {
                loading: false,
                orders: action.orders
            };
        case actionTypes.ORDER_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.error
            };
        case actionTypes.ORDER_LIST_MY_RESET:
            return {
                orders: []
            };
        default:
            return state;
    }
};

export default orderListMy;
