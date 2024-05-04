import axios from "axios";

import * as actionTypes from "../actionTypes";

export const listMyOrders = () => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.ORDER_LIST_MY_REQUEST });

        const {
            login: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        axios
            .get(`/api/orders/myorders`, config)
            .then((response) => {
                dispatch({
                    type: actionTypes.ORDER_LIST_MY_SUCCESS,
                    orders: response.data
                });
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.ORDER_LIST_MY_FAIL,
                    error:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message
                });
            });
    };
};
