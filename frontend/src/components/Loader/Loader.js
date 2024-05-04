import React from "react";

import styles from "./Loader.module.css";

const Loader = () => {
    return (
        <div className={styles.Spinner}>
            <div className={styles.Bounce1}></div>
            <div className={styles.Bounce2}></div>
        </div>
    );
};

export default Loader;
