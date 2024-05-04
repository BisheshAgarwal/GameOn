import axios from "axios";
import * as actionTypes from "../actionTypes";

export const addToCart = (id, qty) => {
    return (dispatch, getState) => {
        axios.get(`/api/products/${id}`).then((response) => {
            dispatch({
                type: actionTypes.CART_ADD_ITEM,
                item: {
                    product: response.data._id,
                    name: response.data.name,
                    image: response.data.image,
                    price: response.data.price,
                    countInStock: response.data.countInStock,
                    qty: qty
                }
            });
            localStorage.setItem(
                "cartItems",
                JSON.stringify(getState().cart.cartItems)
            );
        });
    };
};

export const removeFromCart = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.CART_REMOVE_ITEM, id: id });
        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().cart.cartItems)
        );
    };
};

export const saveShippingAddress = (data) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.CART_SAVE_SHIPPING_ADDRESS, data: data });
        localStorage.setItem("shippingAddress", JSON.stringify(data));
    };
};
