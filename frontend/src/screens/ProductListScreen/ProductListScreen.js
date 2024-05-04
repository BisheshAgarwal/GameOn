import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import styles from "../UserListScreen/UserListScreen.module.css";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { listProducts } from "../../store/actions/ProductActions/productList";
import { deleteProduct } from "../../store/actions/ProductActions/productDelete";
import { createProduct } from "../../store/actions/ProductActions/productCreate";
import * as actionTypes from "../../store/actions/actionTypes";

const ProductList = (props) => {
    useEffect(() => {
        props.onCreateProductReset();
        if (!props.userInfo || !props.userInfo.isAdmin) {
            props.history.push("/login");
        }

        if (props.successCreate) {
            props.history.push(
                `/admin/product/${props.createdProduct._id}/edit`
            );
        } else {
            props.onListProducts();
        }
        // eslint-disable-next-line
    }, [
        props.userInfo,
        props.successDelete,
        props.successCreate,
        props.createdProduct
    ]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure ?")) {
            props.onDeleteProduct(id);
        }
    };

    const createProductHandler = () => {
        props.onCreateProduct();
    };

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
                        <h1 className={styles.PrimaryHeading}>PRODUCTS</h1>
                        <button
                            onClick={createProductHandler}
                            className={styles.Button}
                        >
                            <i
                                className="fas fa-plus"
                                style={{ marginRight: ".5rem" }}
                            />
                            Create Product
                        </button>
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
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>CATEGORY</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.products.map((product) => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td
                                                style={{
                                                    textTransform: "capitalize"
                                                }}
                                            >
                                                {product.category}
                                            </td>
                                            <td>
                                                <Link
                                                    className={styles.Edit}
                                                    to={`/admin/product/${product._id}/edit`}
                                                >
                                                    <i className="fas fa-edit" />
                                                </Link>
                                                <button
                                                    className={styles.Delete}
                                                    onClick={() =>
                                                        deleteHandler(
                                                            product._id
                                                        )
                                                    }
                                                >
                                                    <i className="fas fa-trash" />
                                                </button>
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
        loading: state.productList.loading,
        error: state.productList.error,
        products: state.productList.products,
        userInfo: state.login.userInfo,
        successDelete: state.productDelete.success,
        successCreate: state.productCreate.success,
        errorCreate: state.productCreate.error,
        createdProduct: state.productCreate.product
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onListProducts: () => dispatch(listProducts()),
        onDeleteProduct: (id) => dispatch(deleteProduct(id)),
        onCreateProduct: () => dispatch(createProduct()),
        onCreateProductReset: () =>
            dispatch({ type: actionTypes.PRODUCT_CREATE_RESET })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
