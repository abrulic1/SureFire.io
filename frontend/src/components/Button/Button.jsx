import React from "react";
import ButtonStyles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type="submit"
      onClick={props.onClick}
      className={
        ButtonStyles[
          props.mode === "light" || !props.mode ? "button-light" : "button-dark"
        ]
      }
      style={props.style}
    >
      {props.text}
    </button>
  );
};

export default Button;
