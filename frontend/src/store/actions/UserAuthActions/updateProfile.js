import axios from "axios";

import * as actionTypes from "../actionTypes";

export const updateProfile = (user) => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.USER_UPDATE_REQUEST });

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
            .put("/api/users/profile", user, config)
            .then((response) => {
                dispatch({
                    type: actionTypes.USER_UPDATE_SUCCESS,
                    userInfo: response.data
                });
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.USER_UPDATE_FAIL,
                    error:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message
                });
            });
    };
};
