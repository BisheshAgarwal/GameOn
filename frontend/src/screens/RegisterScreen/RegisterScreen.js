import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./RegisterScreen.module.css";
import { register } from "../../store/actions/UserAuthActions/register";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";

const RegisterScreen = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const redirect = props.location.search
        ? props.location.search.split("=")[1]
        : "/";

    useEffect(() => {
        if (props.userInfo) {
            props.history.push(redirect);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.userInfo, redirect]);

    const submitHandler = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
        } else {
            props.onUserRegister(name, email, password);
        }
    };

    return (
        <section className={styles.LoginSection}>
            <form className={styles.Form}>
                {props.loading && <Loader />}
                <h1>Register</h1>
                {props.error && <Message>{props.error}</Message>}
                {message && <Message>{message}</Message>}
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className={styles.Input}
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={styles.Input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className={styles.Input}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className={styles.Input}
                />
                <div className={styles.ButtonContainer}>
                    <input
                        type="submit"
                        onClick={submitHandler}
                        value="Register"
                        className={styles.Button}
                    />
                    <Link
                        className={styles.Register}
                        to={redirect ? `/login?redirect=${redirect}` : "/login"}
                    >
                        Already an user?
                    </Link>
                </div>
            </form>
        </section>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.register.loading,
        error: state.register.error,
        userInfo: state.register.userInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUserRegister: (name, email, password) =>
            dispatch(register(name, email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
