import axios from "axios";

import * as actionTypes from "../actionTypes";

export const deleteUser = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.USER_DELETE_REQUEST });

        const {
            login: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        axios
            .delete(`/api/users/${id}`, config)
            .then((response) => {
                dispatch({
                    type: actionTypes.USER_DELETE_SUCCESS
                });
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.USER_DELETE_FAIL,
                    error:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message
                });
            });
    };
};
