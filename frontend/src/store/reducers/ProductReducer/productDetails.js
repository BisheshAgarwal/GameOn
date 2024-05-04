import * as actionTypes from "../../actions/actionTypes";

const initialState = {
    product: {}
};

const productDetails = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_DETAILS_REQUEST:
            return {
                loading: true
            };
        case actionTypes.PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.product
            };
        case actionTypes.PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.error
            };
        case actionTypes.PRODUCT_DETAILS_RESET:
            return {
                product: {}
            };
        default:
            return state;
    }
};

export default productDetails;
