import axios from "axios";

import * as actionTypes from "../actionTypes";

export const listProducts = () => {
    return (dispatch) => {
        dispatch({ type: actionTypes.PRODUCT_LIST_REQUEST });
        axios
            .get("/api/products")
            .then((response) => {
                dispatch({
                    type: actionTypes.PRODUCT_LIST_SUCCESS,
                    products: response.data
                });
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.PRODUCT_LIST_FAIL,
                    error:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message
                });
            });
    };
};
