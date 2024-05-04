import axios from "axios";

import * as actionTypes from "../actionTypes";

export const payOrder = (orderId, paymentResult) => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.ORDER_PAY_REQUEST });

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
            .put(`/api/orders/${orderId}/pay`, paymentResult, config)
            .then((response) => {
                dispatch({
                    type: actionTypes.ORDER_PAY_SUCCESS
                });
                dispatch({ type: actionTypes.USER_DETAILS_RESET });
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.ORDER_PAY_FAIL,
                    error:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message
                });
            });
    };
};
