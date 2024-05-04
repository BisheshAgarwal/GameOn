import axios from "axios";

import * as actionTypes from "../actionTypes";

export const listProduct = (id) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.PRODUCT_DETAILS_REQUEST });
        axios
            .get(`/api/products/${id}`)
            .then((response) => {
                dispatch({
                    type: actionTypes.PRODUCT_DETAILS_SUCCESS,
                    product: response.data
                });
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.PRODUCT_DETAILS_FAIL,
                    error:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message
                });
            });
    };
};
