import axios from "axios";

import * as actionTypes from "../actionTypes";

export const createProduct = () => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.PRODUCT_CREATE_REQUEST });

        const {
            login: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        axios
            .post(`/api/products`, {}, config)
            .then((response) => {
                dispatch({
                    type: actionTypes.PRODUCT_CREATE_SUCCESS,
                    product: response.data
                });
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.PRODUCT_CREATE_FAIL,
                    error:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message
                });
            });
    };
};
