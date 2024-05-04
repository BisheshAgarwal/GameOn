import axios from "axios";

import * as actionTypes from "../actionTypes";

export const register = (name, email, password) => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.USER_REGISTER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        axios
            .post("/api/users", { name, email, password }, config)
            .then((response) => {
                dispatch({
                    type: actionTypes.USER_REGISTER_SUCCESS,
                    userInfo: response.data
                });

                dispatch({
                    type: actionTypes.USER_LOGIN_SUCCESS,
                    userInfo: response.data
                });

                localStorage.setItem("userInfo", JSON.stringify(response.data));
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.USER_REGISTER_FAIL,
                    error:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message
                });
            });
    };
};
