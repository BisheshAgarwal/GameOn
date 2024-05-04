import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { listProduct } from "../../store/actions/ProductActions/productDetails";
import styles from "./ProductScreen.module.css";
import Loader from "../../components/Loader/Loader";

const ProductScreen = (props) => {
    const productId = props.match.params.id;

    const [qty, setQty] = useState(1);

    useEffect(() => {
        props.onListProduct(productId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId]);

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };

    return (
        <section className={styles.ProductDetailsSection}>
            {props.loadingProduct ? (
                <Loader />
            ) : (
                <div className={styles.Container}>
                    <div className={styles.ImgContainer}>
                        <img
                            src={props.product.image}
                            alt={props.product.name}
                        />
                    </div>
                    <div className={styles.GameContainer}>
                        <div className={styles.GameAboutContainer}>
                            <h2 className={styles.AboutHeading}>
                                About <span>{props.product.name}</span>
                            </h2>
                            <p>{props.product.description}</p>
                        </div>
                        <div className={styles.GameDetailsContainer}>
                            <div className={styles.Detail}>
                                <span className={styles.Key}>Price</span>
                                <span className={styles.Value}>
                                    ${props.product.price}
                                </span>
                            </div>
                            <div className={styles.Detail}>
                                <span className={styles.Key}>Status</span>
                                <span className={styles.Value}>
                                    {props.product.countInStock > 0
                                        ? "In Stock"
                                        : "Out of Stock"}
                                </span>
                            </div>
                            {props.product.countInStock > 0 && (
                                <div className={styles.Detail}>
                                    <span className={styles.Key}>Qty</span>
                                    <select
                                        value={qty}
                                        onChange={(event) =>
                                            setQty(event.target.value)
                                        }
                                        className={styles.Select}
                                    >
                                        {[
                                            ...Array(
                                                props.product.countInStock
                                            ).keys()
                                        ].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <div className={styles.Detail}>
                                <button
                                    disabled={!props.product.countInStock > 0}
                                    className={styles.CartButton}
                                    onClick={addToCartHandler}
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

const mapStateToProps = (state) => {
    return {
        loadingProduct: state.productDetails.loading,
        errorProduct: state.productDetails.error,
        product: state.productDetails.product
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onListProduct: (id) => dispatch(listProduct(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);
