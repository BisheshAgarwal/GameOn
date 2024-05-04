import * as actionTypes from "../../actions/actionTypes";

const initialState = {
    product: {}
};

const productDelete = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_DELETE_REQUEST:
            return {
                loading: true
            };
        case actionTypes.PRODUCT_DELETE_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case actionTypes.PRODUCT_DELETE_FAIL:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default productDelete;
