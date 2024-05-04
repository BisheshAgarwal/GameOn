import axios from "axios";

import * as actionTypes from "../actionTypes";

export const deliverOrder = (order) => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.ORDER_DELIVER_REQUEST });

        const {
            login: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        axios
            .put(`/api/orders/${order._id}/deliver`, {}, config)
            .then((response) => {
                dispatch({
                    type: actionTypes.ORDER_DELIVER_SUCCESS
                });
                dispatch({ type: actionTypes.USER_DETAILS_RESET });
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.ORDER_DELIVER_FAIL,
                    error:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message
                });
            });
    };
};
