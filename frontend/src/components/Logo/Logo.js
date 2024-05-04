import React from "react";
import { Link } from "react-router-dom";

import styles from "./Logo.module.css";

const Logo = () => {
    return (
        <Link className={styles.LogoLink} to="/">
            <h1 className={styles.Logo}>
                Game
                <span>On</span>
            </h1>
        </Link>
    );
};

export default Logo;
