import axios from "axios";

import * as actionTypes from "../actionTypes";

export const getOrderDetails = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.ORDER_DETAILS_REQUEST });

        const {
            login: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        axios
            .get(`/api/orders/${id}`, config)
            .then((response) => {
                dispatch({
                    type: actionTypes.ORDER_DETAILS_SUCCESS,
                    order: response.data
                });
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.ORDER_DETAILS_FAIL,
                    error:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message
                });
            });
    };
};
