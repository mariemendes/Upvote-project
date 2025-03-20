import React from "react";

export function Button({ onClick, className, children, style, buttonText }) {
  return (
    <button onClick={onClick} className={className} style={style}>
      {buttonText}
      {children}
    </button>
  );
}
