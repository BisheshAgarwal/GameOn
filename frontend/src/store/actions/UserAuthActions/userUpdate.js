import axios from "axios";

import * as actionTypes from "../actionTypes";

export const updateUser = (user) => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.USER_ADMIN_UPDATE_REQUEST });

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
            .put(`/api/users/${user._id}`, user, config)
            .then((response) => {
                dispatch({
                    type: actionTypes.USER_ADMIN_UPDATE_SUCCESS
                });
                dispatch({
                    type: actionTypes.USER_DETAILS_SUCCESS,
                    user: response.data
                });
                dispatch({ type: actionTypes.USER_DETAILS_RESET })
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.USER_ADMIN_UPDATE_FAIL,
                    error:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message
                });
            });
    };
};
