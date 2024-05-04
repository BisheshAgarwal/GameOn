import * as actionTypes from "../../actions/actionTypes";

const initialState = {
    orders: []
};

const orderList = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_LIST_REQUEST:
            return {
                loading: true
            };
        case actionTypes.ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.orders
            };
        case actionTypes.ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default orderList;
