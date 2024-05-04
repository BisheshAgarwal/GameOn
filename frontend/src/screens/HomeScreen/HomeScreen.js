import React, { useEffect } from "react";
import { connect } from "react-redux";

import styles from "./HomeScreen.module.css";
import Product from "../../components/Product/Product";
import ProductCarousel from "../../components/Carousel/Carousel";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import { listProducts } from "../../store/actions/ProductActions/productList";
import Message from "../../components/Message/Message";

const HomeScreen = (props) => {
    useEffect(() => {
        props.onListProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className={styles.CarouselContainer}>
                <ProductCarousel
                    id1="6633b9d7b24b41593a32be80"
                    id2="6633b9d7b24b41593a32be81"
                    id3="6633b9d7b24b41593a32be84"
                />
            </div>
            <section className={styles.ShopSection}>
                <h2 className={styles.ShopHeading}>
                    Game <span>Shop</span>
                </h2>
                <div className={styles.Container}>
                    {props.loadingProducts ? (
                        <Loader />
                    ) : props.errorProducts ? (
                        <Message>{props.errorProducts}</Message>
                    ) : (
                        props.products &&
                        props.products.map((product) => (
                            <Product
                                id={product._id}
                                image={product.image}
                                name={product.name}
                                category={product.category}
                                price={product.price}
                                key={product.name}
                            />
                        ))
                    )}
                </div>
            </section>
            <section
                className={styles.AboutSection}
                style={{
                    height: "90vh",
                    backgroundImage:
                        "linear-gradient(to right, rgba(0,0,0,.6), rgba(0,0,0,.6)), url(/images/about-background-image.jpg)"
                }}
            >
                <div className={styles.AboutContainer}>
                    <img
                        src="/images/about-image.jpg"
                        alt="meeting"
                        className={styles.AboutImage}
                    />

                    <div className={styles.AboutTextContainer}>
                        <h2>
                            About The <span>GameOn</span>
                        </h2>
                        <p>
                            GameOn is an ecommerce webiste designed and
                            developed specifically to meet all your gaming
                            needs. We offer the best prices and services for all
                            the products.
                        </p>
                        <Button link="/about">Read More</Button>
                    </div>
                </div>
            </section>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        loadingProducts: state.productList.loading,
        products: state.productList.products,
        errorProducts: state.productList.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onListProducts: () => dispatch(listProducts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
