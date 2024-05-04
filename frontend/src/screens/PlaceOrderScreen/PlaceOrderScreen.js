import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./PlaceOrder.module.css";
import Message from "../../components/Message/Message";
import InfoMessage from "../../components/Message/InfoMessage";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { createOrder } from "../../store/actions/OrderActions/orderCreate";
import * as actionTypes from "../../store/actions/actionTypes";

const PlaceOrderScreen = (props) => {
    useEffect(() => {
        if (props.success) {
            props.onCreateOrderReset();
            props.history.push(`/order/${props.order._id}`);
        }
        // eslint-disable-next-line
    }, [props.history, props.success]);

    // CALCULATE PRICES

    let itemsPrice = props.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    let shippingPrice = itemsPrice > 100 ? 0 : 100;

    let taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    let totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

    const placeOrderHandler = () => {
        props.onCreateOrder({
            orderItems: props.cartItems,
            shippingAddress: props.shippingAddress,
            paymentMethod: "PayPal",
            itemsPrice: itemsPrice,
            shippingPrice: shippingPrice,
            taxPrice: taxPrice,
            totalPrice: totalPrice
        });
    };

    return (
        <section className={styles.PlaceOrderSection}>
            <div className={styles.CheckoutStepsContainer}>
                <CheckoutSteps step1 step2 step3 />
            </div>
            <div className={styles.Container}>
                <div className={styles.OrderSummary}>
                    <div className={styles.SubContainer}>
                        <h2 className={styles.Heading}>
                            Shipping <span>Address</span>
                        </h2>
                        <p className={styles.Address}>
                            <span>Address:</span>{" "}
                            {props.shippingAddress.address},{" "}
                            {props.shippingAddress.city}{" "}
                            {props.shippingAddress.postalCode},{" "}
                            {props.shippingAddress.country}
                        </p>
                    </div>
                    <div className={styles.SubContainer}>
                        <h2 className={styles.Heading}>
                            Payment <span>Method</span>
                        </h2>
                        <p className={styles.Address}>
                            <span>Method:</span> PayPal
                        </p>
                    </div>
                    <div className={styles.SubContainer}>
                        <h2 className={styles.Heading}>
                            Order <span>Items</span>
                        </h2>
                        {props.cartItems.length === 0 ? (
                            <InfoMessage>Your cart is empty!</InfoMessage>
                        ) : (
                            props.cartItems.map((item) => (
                                <div
                                    key={item.product}
                                    className={styles.OrderItem}
                                >
                                    <div className={styles.OrderItemImg}>
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className={styles.OrderItemName}>
                                        <Link
                                            className={styles.Link}
                                            to={`/product/${item.product}`}
                                        >
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div className={styles.OrderItemPrice}>
                                        {item.qty} pcs x ${item.price} = $
                                        {(item.price * item.qty).toFixed(2)}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className={styles.PlaceOrder}>
                    <h2 className={styles.Heading}>
                        Order <span>Summary</span>
                    </h2>
                    <div className={styles.OrderDetail}>
                        <p>Items</p> ${itemsPrice.toFixed(2)}
                    </div>
                    <div className={styles.OrderDetail}>
                        <p>Shipping</p> ${shippingPrice.toFixed(2)}
                    </div>
                    <div className={styles.OrderDetail}>
                        <p>Tax</p> ${taxPrice}
                    </div>
                    <div className={styles.OrderDetail}>
                        <p>Total</p> ${totalPrice}
                    </div>
                    {props.error && (
                        <div className={styles.OrderDetail}>
                            <Message>{props.error}</Message>
                        </div>
                    )}
                    <div className={styles.OrderDetail}>
                        <button
                            disabled={props.cartItems.length === 0}
                            className={styles.PlaceOrderButton}
                            onClick={placeOrderHandler}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = (state) => {
    return {
        shippingAddress: state.cart.shippingAddress,
        cartItems: state.cart.cartItems,
        order: state.orderCreate.order,
        success: state.orderCreate.success,
        error: state.orderCreate.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateOrder: (order) => dispatch(createOrder(order)),
        onCreateOrderReset: () =>
            dispatch({ type: actionTypes.ORDER_CREATE_RESET })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrderScreen);
