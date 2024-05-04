import * as actionTypes from "../../actions/actionTypes";

const initialState = {
    products: []
};

const productList = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_LIST_REQUEST:
            return {
                loading: true
            };
        case actionTypes.PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.products
            };
        case actionTypes.PRODUCT_LIST_FAIL:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default productList;
