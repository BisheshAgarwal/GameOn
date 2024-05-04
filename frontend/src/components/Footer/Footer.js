import React from "react";

import styles from "./Footer.module.css";
import Logo from "../Logo/Logo";

const Footer = () => {
    return (
        <footer className={styles.Footer}>
            <div className={styles.Container}>
                <Logo />
                <p className={styles.Copyright}>
                    Copyright &copy; {new Date().getFullYear()} GameOn - All
                    rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
