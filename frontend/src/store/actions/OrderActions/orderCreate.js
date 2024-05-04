import axios from "axios";

import * as actionTypes from "../actionTypes";

export const createOrder = (order) => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.ORDER_CREATE_REQUEST });

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
            .post("/api/orders", order, config)
            .then((response) => {
                dispatch({
                    type: actionTypes.ORDER_CREATE_SUCCESS,
                    order: response.data
                });
                dispatch({ type: actionTypes.USER_DETAILS_RESET });
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.ORDER_CREATE_FAIL,
                    error:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message
                });
            });
    };
};
