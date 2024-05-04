import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./CartScreen.module.css";
import {
    addToCart,
    removeFromCart
} from "../../store/actions/CartActions/cart";
import InfoMessage from "../../components/Message/InfoMessage";

const CartScreen = (props) => {
    const productId = props.match.params.id;
    const qty = props.location.search
        ? Number(props.location.search.split("=")[1])
        : 1;

    useEffect(() => {
        if (productId) {
            props.onAddToCart(productId, qty);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId, qty]);

    const removeFromCartHandler = (id) => {
        props.onRemoveFromCart(id);
    };

    const checkoutHandler = () => {
        props.history.push("/login?redirect=shipping");
    };

    return (
        <section className={styles.CartSection}>
            <h1 className={styles.Heading}>Cart</h1>
            <div className={styles.Container}>
                <div>
                    {props.cartItems.length === 0 ? (
                        <InfoMessage>
                            Your cart is empty. <Link to="/">Go Back</Link>
                        </InfoMessage>
                    ) : (
                        <>
                            <div className={styles.CartHeading}>
                                <div>&nbsp;</div>
                                <div>Product</div>
                                <div>Price</div>
                                <div>Qty</div>
                                <div>&nbsp;</div>
                            </div>
                            {props.cartItems.map((item) => (
                                <div className={styles.Cart} key={item.product}>
                                    <Link
                                        to={`/product/${item.product}`}
                                        className={styles.Img}
                                    >
                                        <img src={item.image} alt={item.name} />
                                    </Link>
                                    <div>
                                        <Link
                                            className={styles.Link}
                                            to={`/product/${item.product}`}
                                        >
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div>${item.price}</div>
                                    <div>
                                        <select
                                            className={styles.Select}
                                            value={item.qty}
                                            onChange={(event) =>
                                                props.onAddToCart(
                                                    item.product,
                                                    Number(event.target.value)
                                                )
                                            }
                                        >
                                            {[
                                                ...Array(
                                                    item.countInStock
                                                ).keys()
                                            ].map((x) => (
                                                <option
                                                    key={x + 1}
                                                    value={x + 1}
                                                >
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <button
                                            className={styles.Delete}
                                            onClick={() =>
                                                removeFromCartHandler(
                                                    item.product
                                                )
                                            }
                                        >
                                            <i
                                                className="far fa-trash-alt"
                                                style={{ color: "red" }}
                                            ></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
                <div className={styles.Total}>
                    <h2>
                        Cart <span>Totals</span>
                    </h2>
                    <p>
                        Subtotal (
                        {props.cartItems.reduce(
                            (acc, item) => acc + item.qty,
                            0
                        )}
                        ) items
                    </p>
                    <p>
                        $
                        {props.cartItems
                            .reduce(
                                (acc, item) => acc + item.qty * item.price,
                                0
                            )
                            .toFixed(2)}
                    </p>
                    <button
                        disabled={props.cartItems.length === 0}
                        className={styles.Button}
                        onClick={checkoutHandler}
                    >
                        Proceed to checkout
                    </button>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = (state) => {
    return {
        cartItems: state.cart.cartItems
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (id, qty) => dispatch(addToCart(id, qty)),
        onRemoveFromCart: (id) => dispatch(removeFromCart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
