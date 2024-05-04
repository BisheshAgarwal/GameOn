import React from "react";

const Message = (props) => {
    return (
        <div
            className="alert alert-danger"
            role="alert"
            style={{ fontSize: "1.3rem", fontFamily: "var(--font-heading)" }}
        >
            {props.children}
        </div>
    );
};

export default Message;
