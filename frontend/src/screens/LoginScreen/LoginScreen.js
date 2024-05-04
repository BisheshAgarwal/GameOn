import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./LoginScreen.module.css";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { login } from "../../store/actions/UserAuthActions/login";

const LoginScreen = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

        props.onUserLogin(email, password);
    };

    return (
        <section className={styles.LoginSection}>
            <form className={styles.Form}>
                {props.loading && <Loader />}
                <h1>Login</h1>
                {props.error && <Message>{props.error}</Message>}
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
                <div className={styles.ButtonContainer}>
                    <input
                        type="submit"
                        onClick={submitHandler}
                        value="Sign In"
                        className={styles.Button}
                    />
                    <Link
                        className={styles.Register}
                        to={
                            redirect
                                ? `/register?redirect=${redirect}`
                                : "/register"
                        }
                    >
                        Create an account
                    </Link>
                </div>
            </form>
        </section>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.login.loading,
        error: state.login.error,
        userInfo: state.login.userInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUserLogin: (email, password) => dispatch(login(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
