import React from "react";

const Button = ({ text, py, px, bgColor, textColor, rounded, marginLeft }) => {
  return (
    <button
      className={` bg-${bgColor} px-${px} py-${py} rounded-${rounded} ml-${marginLeft} text-${textColor}`}
    >
      {text}
    </button>
  );
};
export default Button;
