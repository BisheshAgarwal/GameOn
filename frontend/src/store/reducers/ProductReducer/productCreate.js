import * as actionTypes from "../../actions/actionTypes";

const initialState = {};

const productCreate = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_CREATE_REQUEST:
            return {
                loading: true
            };
        case actionTypes.PRODUCT_CREATE_SUCCESS:
            return {
                loading: false,
                product: action.product,
                success: true
            };
        case actionTypes.PRODUCT_CREATE_FAIL:
            return {
                loading: false,
                error: action.error
            };
        case actionTypes.PRODUCT_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export default productCreate;
