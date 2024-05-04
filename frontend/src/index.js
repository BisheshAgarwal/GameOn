import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import ProductListReducer from "./store/reducers/ProductReducer/productList";
import ProductDetailsReducer from "./store/reducers/ProductReducer/productDetails";
import CartReducer from "./store/reducers/CartReducer/cart";
import LoginReducer from "./store/reducers/UserAuthReducer/login";
import RegisterReducer from "./store/reducers/UserAuthReducer/register";
import UserDetailsReducer from "./store/reducers/UserAuthReducer/userDetails";
import UserUpdateReducer from "./store/reducers/UserAuthReducer/updateProfile";
import OrderCreateReducer from "./store/reducers/OrderReducer/orderCreate";
import OrderDetailsReducer from "./store/reducers/OrderReducer/orderDetails";
import OrderPayReducer from "./store/reducers/OrderReducer/orderPay";
import OrderListMyReducer from "./store/reducers/OrderReducer/orderListMy";
import UserListReducer from "./store/reducers/UserAuthReducer/userList";
import UserDeleteReducer from "./store/reducers/UserAuthReducer/userDelete";
import UserAdminUpdateReducer from "./store/reducers/UserAuthReducer/userUpdate";
import ProductDeleteReducer from "./store/reducers/ProductReducer/productDelete";
import ProductCreateReducer from "./store/reducers/ProductReducer/productCreate";
import ProductUpdateReducer from "./store/reducers/ProductReducer/productUpdate";
import OrderListReducer from "./store/reducers/OrderReducer/orderList";
import OrderDeliverReducer from "./store/reducers/OrderReducer/orderDeliver";

//Setup Redux Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Combine reducers
const rootReducer = combineReducers({
    productList: ProductListReducer,
    productDetails: ProductDetailsReducer,
    cart: CartReducer,
    login: LoginReducer,
    register: RegisterReducer,
    userDetails: UserDetailsReducer,
    updateProfile: UserUpdateReducer,
    orderCreate: OrderCreateReducer,
    orderDetails: OrderDetailsReducer,
    orderPay: OrderPayReducer,
    orderListMy: OrderListMyReducer,
    userList: UserListReducer,
    userDelete: UserDeleteReducer,
    userUpdate: UserAdminUpdateReducer,
    productDelete: ProductDeleteReducer,
    productCreate: ProductCreateReducer,
    productUpdate: ProductUpdateReducer,
    orderList: OrderListReducer,
    orderDeliver: OrderDeliverReducer
});

//Create store with thunk middleware and redux dev tools
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
