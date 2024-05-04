import React from "react";

const InfoMessage = (props) => {
    return (
        <div
            className="alert alert-info"
            role="alert"
            style={{ fontSize: "1.3rem", fontFamily: "var(--font-heading)" }}
        >
            {props.children}
        </div>
    );
};

export default InfoMessage;
