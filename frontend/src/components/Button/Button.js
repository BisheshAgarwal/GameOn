import React from "react";
import { Link } from "react-router-dom";

import styles from "./Button.module.css";

const Button = (props) => {
    return (
        <Link className={styles.Button} to={props.link}>
            {props.children}
        </Link>
    );
};

export default Button;
