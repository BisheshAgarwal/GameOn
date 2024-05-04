import axios from "axios";

import * as actionTypes from "../actionTypes";

export const listUsers = () => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.USER_LIST_REQUEST });

        const {
            login: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        axios
            .get(`/api/users`, config)
            .then((response) => {
                dispatch({
                    type: actionTypes.USER_LIST_SUCCESS,
                    users: response.data
                });
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.USER_LIST_FAIL,
                    error:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message
                });
            });
    };
};
