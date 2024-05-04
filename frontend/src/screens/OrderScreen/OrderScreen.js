import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";

import styles from "../PlaceOrderScreen/PlaceOrder.module.css";
import Message from "../../components/Message/Message";
import InfoMessage from "../../components/Message/InfoMessage";
import SuccessMessage from "../../components/Message/SuccessMessage";
import Loader from "../../components/Loader/Loader";
import { getOrderDetails } from "../../store/actions/OrderActions/orderDetails";
import { payOrder } from "../../store/actions/OrderActions/orderPay";
import { deliverOrder } from "../../store/actions/OrderActions/orderDeliver";
import * as actionTypes from "../../store/actions/actionTypes";

const OrderScreen = (props) => {
    const orderId = props.match.params.id;

    const [sdkReady, setSdkReady] = useState(false);

    let itemsPrice =
        props.order &&
        props.order.orderItems.reduce(
            (acc, item) => acc + item.price * item.qty,
            0
        );

    useEffect(() => {
        if (!props.userInfo) {
            props.history.push("/login");
        }

        const addPaypalScript = async () => {
            const { data: clientId } = await axios.get("/api/config/paypal");
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.async = true;
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };

        if (
            !props.order ||
            props.successPay ||
            props.order._id !== orderId ||
            props.successDeliver
        ) {
            props.onOrderPayReset();
            props.onOrderDeliverReset();
            props.onGetOrderDetails(orderId);
        } else if (!props.order.isPaid) {
            if (!window.paypal) {
                addPaypalScript();
            } else {
                setSdkReady(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId, props.successPay, props.order, props.successDeliver]);

    const successPaymentHandler = (paymentResult) => {
        props.onSuccessPayment(orderId, paymentResult);
    };

    const deliverHandler = () => {
        props.onOrderDeliver(props.order);
    };

    return (
        <section className={styles.PlaceOrderSection}>
            {props.loading ? (
                <Loader />
            ) : props.error ? (
                <Message>{props.error}</Message>
            ) : (
                <>
                    <div
                        style={{ marginBottom: "2rem", hyphens: "auto" }}
                        className={styles.Container}
                    >
                        <h2 className={styles.Heading}>
                            Order <span>{orderId}</span>
                        </h2>
                    </div>
                    <div className={styles.Container}>
                        <div className={styles.OrderSummary}>
                            <div className={styles.SubContainer}>
                                <h2 className={styles.Heading}>
                                    Shipping <span>Address</span>
                                </h2>
                                <p style={{ fontSize: "1.5rem" }}>
                                    <strong>User:</strong>{" "}
                                    {props.order.user.name}
                                </p>
                                <p style={{ fontSize: "1.5rem" }}>
                                    <strong>Email: </strong>
                                    <a
                                        href={`mailto: ${props.order.user.email}`}
                                    >
                                        {props.order.user.email}
                                    </a>
                                </p>
                                <p className={styles.Address}>
                                    <span>Address:</span>{" "}
                                    {props.order.shippingAddress.address},{" "}
                                    {props.order.shippingAddress.city}{" "}
                                    {props.order.shippingAddress.postalCode},{" "}
                                    {props.order.shippingAddress.country}
                                </p>
                                {props.order.isDelivered ? (
                                    <SuccessMessage>
                                        Delivered on {props.order.deliveredAt}
                                    </SuccessMessage>
                                ) : (
                                    <Message>Not Delivered</Message>
                                )}
                            </div>
                            <div className={styles.SubContainer}>
                                <h2 className={styles.Heading}>
                                    Payment <span>Method</span>
                                </h2>
                                <p className={styles.Address}>
                                    <span>Method:</span>{" "}
                                    {props.order.paymentMethod}
                                </p>
                                {props.order.isPaid ? (
                                    <SuccessMessage>
                                        Paid on {props.order.paidAt}
                                    </SuccessMessage>
                                ) : (
                                    <Message>Not Paid</Message>
                                )}
                            </div>
                            <div className={styles.SubContainer}>
                                <h2 className={styles.Heading}>
                                    Order <span>Items</span>
                                </h2>
                                {props.order.orderItems.length === 0 ? (
                                    <InfoMessage>Order is empty!</InfoMessage>
                                ) : (
                                    props.order.orderItems.map((item) => (
                                        <div
                                            key={item.product}
                                            className={styles.OrderItem}
                                        >
                                            <div
                                                className={styles.OrderItemImg}
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                />
                                            </div>
                                            <div
                                                className={styles.OrderItemName}
                                            >
                                                <Link
                                                    className={styles.Link}
                                                    to={`/product/${item.product}`}
                                                >
                                                    {item.name}
                                                </Link>
                                            </div>
                                            <div
                                                className={
                                                    styles.OrderItemPrice
                                                }
                                            >
                                                {item.qty} pcs x ${item.price} =
                                                $
                                                {(
                                                    item.price * item.qty
                                                ).toFixed(2)}
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
                                <p>Shipping</p> $
                                {props.order.shippingPrice.toFixed(2)}
                            </div>
                            <div className={styles.OrderDetail}>
                                <p>Tax</p> ${props.order.taxPrice}
                            </div>
                            <div className={styles.OrderDetail}>
                                <p>Total</p> ${props.order.totalPrice}
                            </div>
                            {!props.order.isPaid && (
                                <div
                                    style={{
                                        padding: "1rem 2rem",
                                        fontSize: "1.4rem"
                                    }}
                                >
                                    {props.loadingPay && <Loader />}
                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton
                                            amount={props.order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </div>
                            )}
                            {props.userInfo &&
                                props.userInfo.isAdmin &&
                                props.order.isPaid &&
                                !props.order.isDelivered ? (
                                <div className={styles.OrderDetail}>
                                    <button
                                        className={styles.PlaceOrderButton}
                                        onClick={deliverHandler}
                                    >
                                        Mark as delivered
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.orderDetails.loading,
        error: state.orderDetails.error,
        order: state.orderDetails.order,
        loadingPay: state.orderPay.loading,
        successPay: state.orderPay.success,
        loadingDeliver: state.orderDeliver.loading,
        successDeliver: state.orderDeliver.success,
        userInfo: state.login.userInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetOrderDetails: (id) => dispatch(getOrderDetails(id)),
        onSuccessPayment: (id, paymentResult) =>
            dispatch(payOrder(id, paymentResult)),
        onOrderPayReset: () => dispatch({ type: actionTypes.ORDER_PAY_RESET }),
        onOrderDeliver: (order) => dispatch(deliverOrder(order)),
        onOrderDeliverReset: () =>
            dispatch({ type: actionTypes.ORDER_DELIVER_RESET })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);
