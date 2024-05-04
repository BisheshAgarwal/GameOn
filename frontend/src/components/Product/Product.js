import React from "react";
import { Link } from "react-router-dom";

import styles from "./Product.module.css";

const Product = (props) => {
    return (
        <div className={styles.GameContainer} key={props.name}>
            <Link to={`/product/${props.id}`}>
                <div className={styles.ImgContainer}>
                    <img
                        className={styles.GameImg}
                        src={props.image}
                        alt={props.name}
                    />
                    <h3 className={styles.ImgCaption}>{props.name}</h3>
                </div>
            </Link>

            <h3 className={styles.GameTitle}>{props.name}</h3>
            <div className={styles.Icon}>
                <i className="fas fa-tags"></i>
                <span>{props.category}</span>
            </div>
            <p className={styles.GamePrice}>${props.price}</p>
        </div>
    );
};

export default Product;
