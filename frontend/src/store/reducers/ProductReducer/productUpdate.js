import * as actionTypes from "../../actions/actionTypes";

const initialState = {
    product: {}
};

const productUpdate = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_UPDATE_REQUEST:
            return {
                loading: true
            };
        case actionTypes.PRODUCT_UPDATE_SUCCESS:
            return {
                loading: false,
                product: action.product,
                success: true
            };
        case actionTypes.PRODUCT_UPDATE_FAIL:
            return {
                loading: false,
                error: action.error
            };
        case actionTypes.PRODUCT_UPDATE_RESET:
            return {
                product: {}
            };
        default:
            return state;
    }
};

export default productUpdate;
