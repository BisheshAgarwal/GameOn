import React from "react";

const SuccessMessage = (props) => {
    return (
        <div
            className="alert alert-success"
            role="alert"
            style={{ fontSize: "1.3rem", fontFamily: "var(--font-heading)" }}
        >
            {props.children}
        </div>
    );
};

export default SuccessMessage;
