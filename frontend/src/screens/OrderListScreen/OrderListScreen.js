import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import styles from "../UserListScreen/UserListScreen.module.css";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { listOrders } from "../../store/actions/OrderActions/orderList";

const OrderListScreen = (props) => {
    useEffect(() => {
        if (props.userInfo && props.userInfo.isAdmin) {
            props.onListAllOrders();
        } else {
            props.history.push("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.userInfo]);

    return (
        <section className={styles.UserListSection}>
            <div className={styles.Container}>
                <div className={styles.Users}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <h1 className={styles.PrimaryHeading}>ORDERS</h1>
                    </div>
                    <div className={styles.UsersContainer}>
                        {props.loading ? (
                            <Loader />
                        ) : props.error ? (
                            <Message>{props.error}</Message>
                        ) : (
                            <table className={styles.Table}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>USER</th>
                                        <th>DATE</th>
                                        <th>PRICE</th>
                                        <th>PAID</th>
                                        <th>DELIVERED</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.orders.map((order) => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.user.name}</td>
                                            <td>
                                                {order.createdAt.substring(
                                                    0,
                                                    10
                                                )}
                                            </td>
                                            <td>${order.totalPrice}</td>
                                            <td>
                                                {order.isPaid ? (
                                                    order.paidAt.substring(
                                                        0,
                                                        10
                                                    )
                                                ) : (
                                                    <i
                                                        className="fas fa-times"
                                                        style={{
                                                            color: "red"
                                                        }}
                                                    />
                                                )}
                                            </td>
                                            <td>
                                                {order.isDelivered ? (
                                                    order.deliveredAt.substring(
                                                        0,
                                                        10
                                                    )
                                                ) : (
                                                    <i
                                                        className="fas fa-times"
                                                        style={{
                                                            color: "red"
                                                        }}
                                                    />
                                                )}
                                            </td>
                                            <td>
                                                <Link
                                                    className={styles.Details}
                                                    to={`/order/${order._id}`}
                                                >
                                                    Details
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.orderList.loading,
        error: state.orderList.error,
        orders: state.orderList.orders,
        userInfo: state.login.userInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onListAllOrders: () => dispatch(listOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderListScreen);
