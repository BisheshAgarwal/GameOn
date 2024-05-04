import React, { useState } from "react";
import { connect } from "react-redux";

import styles from "./ShippingScreen.module.css";
import { saveShippingAddress } from "../../store/actions/CartActions/cart";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";

const ShippingScreen = (props) => {
    const [address, setAddress] = useState(props.shippingAddress.address);
    const [city, setCity] = useState(props.shippingAddress.city);
    const [postalCode, setPostalCode] = useState(
        props.shippingAddress.postalCode
    );
    const [country, setCountry] = useState(props.shippingAddress.country);

    const submitHandler = (event) => {
        event.preventDefault();
        props.onSaveShippingAddress({ address, city, postalCode, country });
        props.history.push("/placeorder");
    };

    return (
        <section className={styles.ShippingSection}>
            <div className={styles.Container}>
                <CheckoutSteps step1 step2 />
                <form className={styles.Form} onSubmit={submitHandler}>
                    <h1 className={styles.FormHeading}>Shipping</h1>
                    <label htmlFor="address" className={styles.Label}>
                        Address
                    </label>
                    <input
                        id="address"
                        type="text"
                        placeholder="Enter Address"
                        className={styles.Input}
                        required
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                    />
                    <label htmlFor="city" className={styles.Label}>
                        City
                    </label>
                    <input
                        id="city"
                        type="text"
                        placeholder="Enter City"
                        className={styles.Input}
                        required
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                    />
                    <label htmlFor="postalCode" className={styles.Label}>
                        Postal Code
                    </label>
                    <input
                        id="postalCode"
                        type="text"
                        placeholder="Enter Postal Code"
                        className={styles.Input}
                        required
                        value={postalCode}
                        onChange={(event) => setPostalCode(event.target.value)}
                    />
                    <label htmlFor="country" className={styles.Label}>
                        Country
                    </label>
                    <input
                        id="country"
                        type="text"
                        placeholder="Enter Country"
                        className={styles.Input}
                        required
                        value={country}
                        onChange={(event) => setCountry(event.target.value)}
                    />
                    <input
                        type="submit"
                        value="Continue"
                        className={styles.Button}
                    />
                </form>
            </div>
        </section>
    );
};

const mapStateToProps = (state) => {
    return {
        shippingAddress: state.cart.shippingAddress
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSaveShippingAddress: (address) =>
            dispatch(saveShippingAddress(address))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingScreen);
