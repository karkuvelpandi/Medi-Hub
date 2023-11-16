import React from "react";

export const Button = ({ children, textOnly, className, ...props }) => {
  let cssClasses = textOnly ? "text-button" : "button";
  cssClasses += " " + className;
  return (
    <button {...props} className={cssClasses}>
      {children}
    </button>
  );
};
