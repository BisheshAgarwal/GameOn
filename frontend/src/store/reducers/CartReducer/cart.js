import * as actionTypes from "../../actions/actionTypes";

const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};

const initialState = {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage
};

const cart = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CART_ADD_ITEM:
            const item = action.item;
            const itemExist = state.cartItems.find(
                (x) => x.product === item.product
            );

            if (itemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === itemExist.product ? item : x
                    )
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                };
            }
        case actionTypes.CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (x) => x.product !== action.id
                )
            };
        case actionTypes.CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.data
            };
        default:
            return state;
    }
};

export default cart;
