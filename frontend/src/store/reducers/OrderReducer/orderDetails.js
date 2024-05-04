import * as actionTypes from "../../actions/actionTypes";

const initialState = {
    orderItems: [],
    shippingAddresS: {},
    loading: true
};

const orderDetails = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.order
            };
        case actionTypes.ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default orderDetails;
