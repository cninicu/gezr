import React from "react";

interface ButtonProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    text?: string;
    isLoading?: boolean;
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
    return (
        <button
            type={props.type}
    name={props.name}
    className={`button ${props.className ? props.className : ""} ${props.isLoading ? "is-loading" : ""}`}
    disabled={props.disabled || props.isLoading}
    onClick={props.onClick}
        >
        {props.text && props.children ? <span>{props.text}</span> : props.text}

                {props.children}
                </button>
);
};

export default Button;