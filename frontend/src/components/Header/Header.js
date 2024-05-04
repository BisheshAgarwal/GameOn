import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./Header.module.css";
import Logo from "../../components/Logo/Logo";
import { logout } from "../../store/actions/UserAuthActions/login.js";
import * as actionTypes from "../../store/actions/actionTypes";

const Header = (props) => {
    const logoutHandler = () => {
        props.onUserLogout();
        props.onUserRegisterReset();
        props.onUserDetailsReset();
        props.onOrderListMyReset();
        props.onUserListReset();
    };

    const showMenuHandler = () => {
        if (document.querySelector("nav").style.display === "block") {
            document.querySelector("nav").style.display = "none";
        } else {
            document.querySelector("nav").style.display = "block";
        }
    };

    return (
        <header className={styles.Header}>
            <div className={styles.Container}>
                <Logo />
                <div className={styles.Menu} onClick={showMenuHandler}>
                    <i className="fas fa-bars" />
                </div>
                <nav className={styles.Nav}>
                    <ul>
                        {/* <li>
                            <NavLink
                                activeClassName={styles.active}
                                className={styles.Link}
                                to="/"
                                exact
                            >
                                Home
                            </NavLink>
                        </li> */}
                        <li>
                            <NavLink
                                activeClassName={styles.active}
                                className={styles.Link}
                                to="/cart"
                            >
                                <i
                                    style={{ marginRight: ".5rem" }}
                                    className="fas fa-shopping-cart"
                                ></i>
                                Cart
                            </NavLink>
                        </li>
                        {props.userInfo ? (
                            <li className={styles.UserLink}>
                                <span>
                                    {props.userInfo.name}{" "}
                                    <i className="fas fa-angle-down"></i>
                                </span>
                                <ul>
                                    <li>
                                        <Link
                                            to="/profile"
                                            className={styles.UserLinkProfile}
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={logoutHandler}
                                            className={styles.UserLinkButton}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <li>
                                <NavLink
                                    activeClassName={styles.active}
                                    className={styles.Link}
                                    to="/login"
                                >
                                    Login
                                </NavLink>
                            </li>
                        )}
                        {props.userInfo && props.userInfo.isAdmin ? (
                            <li className={styles.UserLink}>
                                <span>
                                    Admin <i className="fas fa-angle-down"></i>
                                </span>
                                <ul>
                                    <li>
                                        <Link
                                            to="/admin/userlist"
                                            className={styles.UserLinkProfile}
                                        >
                                            Users
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/admin/productlist"
                                            className={styles.UserLinkProfile}
                                        >
                                            Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/admin/orderlist"
                                            className={styles.UserLinkProfile}
                                        >
                                            Orders
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        ) : null}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

const mapStateToProps = (state) => {
    return {
        userInfo: state.login.userInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUserLogout: () => dispatch(logout()),
        onUserRegisterReset: () =>
            dispatch({ type: actionTypes.USER_REGISTER_RESET }),
        onUserDetailsReset: () =>
            dispatch({ type: actionTypes.USER_DETAILS_RESET }),
        onOrderListMyReset: () =>
            dispatch({ type: actionTypes.ORDER_LIST_MY_RESET }),
        onUserListReset: () => dispatch({ type: actionTypes.USER_LIST_RESET })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
