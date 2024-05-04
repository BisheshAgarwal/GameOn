import axios from "axios";

import * as actionTypes from "../actionTypes";

export const getUserDetails = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.USER_DETAILS_REQUEST });

        const {
            login: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        axios
            .get(`/api/users/${id}`, config)
            .then((response) => {
                dispatch({
                    type: actionTypes.USER_DETAILS_SUCCESS,
                    user: response.data
                });
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.USER_DETAILS_FAIL,
                    error:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message
                });
            });
    };
};
