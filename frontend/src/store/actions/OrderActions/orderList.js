import axios from "axios";

import * as actionTypes from "../actionTypes";

export const listOrders = () => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.ORDER_LIST_REQUEST });

        const {
            login: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        axios
            .get(`/api/orders`, config)
            .then((response) => {
                dispatch({
                    type: actionTypes.ORDER_LIST_SUCCESS,
                    orders: response.data
                });
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.ORDER_LIST_FAIL,
                    error:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message
                });
            });
    };
};
