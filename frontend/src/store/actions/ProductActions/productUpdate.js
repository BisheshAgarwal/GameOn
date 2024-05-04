import axios from "axios";

import * as actionTypes from "../actionTypes";

export const updateProduct = (product) => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.PRODUCT_UPDATE_REQUEST });

        const {
            login: { userInfo }
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        axios
            .put(`/api/products/${product._id}`, product, config)
            .then((response) => {
                dispatch({
                    type: actionTypes.PRODUCT_UPDATE_SUCCESS,
                    product: response.data
                });
                dispatch({ type: actionTypes.PRODUCT_DETAILS_RESET });
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.PRODUCT_UPDATE_FAIL,
                    error:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message
                });
            });
    };
};
