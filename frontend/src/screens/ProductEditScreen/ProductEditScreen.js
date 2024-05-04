import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import styles from "../RegisterScreen/RegisterScreen.module.css";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { listProduct } from "../../store/actions/ProductActions/productDetails";
import { updateProduct } from "../../store/actions/ProductActions/productUpdate";
import * as actionTypes from "../../store/actions/actionTypes";

const ProductEditScreen = (props) => {
    const productId = props.match.params.id;

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (props.successUpdate) {
            props.onProductUpdateReset();
            props.history.push("/admin/productlist");
        } else {
            if (
                !props.product ||
                !props.product.name ||
                props.product._id !== productId
            ) {
                props.onListProductDetails(productId);
            } else {
                setName(props.product.name);
                setPrice(props.product.price);
                setImage(props.product.image);
                setCategory(props.product.category);
                setCountInStock(props.product.countInStock);
                setDescription(props.product.description);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.product, productId, props.successUpdate]);

    const submitHandler = (event) => {
        event.preventDefault();
        props.onProductUpdate({
            _id: productId,
            name,
            price,
            image,
            category,
            countInStock,
            description
        });
    };

    const uploadFileHandler = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            };
            const { data } = await axios.post("/api/uploads", formData, config);
            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    return (
        <section style={{ padding: "5rem 0", minHeight: "calc(100vh - 81px)" }}>
            <form className={styles.Form}>
                {props.loading ? (
                    <Loader />
                ) : props.error ? (
                    <Message>{props.error}</Message>
                ) : (
                    <>
                        <div>
                            <Link
                                className={styles.Link}
                                to="/admin/productlist"
                            >
                                Go Back
                            </Link>
                        </div>
                        {props.loadingUpdate && <Loader />}
                        {props.errorUpdate && (
                            <Message>{props.errorUpdate}</Message>
                        )}
                        <h1>
                            Edit{" "}
                            <span style={{ color: "var(--color-primary)" }}>
                                Product
                            </span>
                        </h1>
                        <label
                            style={{ fontSize: "1.4rem", color: "#777" }}
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            id="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className={styles.Input}
                        />
                        <label
                            style={{ fontSize: "1.4rem", color: "#777" }}
                            htmlFor="price"
                        >
                            Price
                        </label>
                        <input
                            type="number"
                            placeholder="Price"
                            id="price"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                            className={styles.Input}
                        />
                        <label
                            style={{ fontSize: "1.4rem", color: "#777" }}
                            htmlFor="image"
                        >
                            Image
                        </label>
                        <input
                            type="text"
                            placeholder="Enter image URL"
                            value={image}
                            id="image"
                            onChange={(event) => setImage(event.target.value)}
                            className={styles.Input}
                        />
                        <input
                            type="file"
                            style={{
                                display: "block",
                                marginBottom: "2rem"
                            }}
                            onChange={uploadFileHandler}
                        />
                        <label
                            style={{ fontSize: "1.4rem", color: "#777" }}
                            htmlFor="category"
                        >
                            Category
                        </label>
                        <input
                            type="text"
                            placeholder="Enter category"
                            value={category}
                            id="category"
                            onChange={(event) =>
                                setCategory(event.target.value)
                            }
                            className={styles.Input}
                        />
                        <label
                            style={{ fontSize: "1.4rem", color: "#777" }}
                            htmlFor="countInStock"
                        >
                            Count in Stock
                        </label>
                        <input
                            type="number"
                            placeholder="Enter count in stock"
                            value={countInStock}
                            id="countInStock"
                            onChange={(event) =>
                                setCountInStock(event.target.value)
                            }
                            className={styles.Input}
                        />
                        <label
                            style={{ fontSize: "1.4rem", color: "#777" }}
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <input
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            id="description"
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                            className={styles.Input}
                        />
                        <div className={styles.ButtonContainer}>
                            <input
                                type="submit"
                                onClick={submitHandler}
                                value="Update"
                                className={styles.Button}
                            />
                        </div>
                    </>
                )}
            </form>
        </section>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.productDetails.loading,
        error: state.productDetails.error,
        product: state.productDetails.product,
        loadingUpdate: state.productUpdate.loading,
        errorUpdate: state.productUpdate.error,
        successUpdate: state.productUpdate.success
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onListProductDetails: (id) => dispatch(listProduct(id)),
        onProductUpdate: (product) => dispatch(updateProduct(product)),
        onProductUpdateReset: () =>
            dispatch({ type: actionTypes.PRODUCT_UPDATE_RESET })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductEditScreen);
