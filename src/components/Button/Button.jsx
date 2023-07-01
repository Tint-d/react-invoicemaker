import React, { useEffect, useMemo } from "react";

function Button(props) {
  const {
    children,
    size = "",
    block = false,
    outlined = false,
    secondary = false,
    success = false,
    danger = false,
  } = props;

  const buttonClasses = useMemo(() => {
    let defaultClasses =
      "rounded-xl font-title  flex flex-row items-center justify-center w-full";

    if (block) {
      defaultClasses += " block w-full text-white bg-blue-500 ";
      if (danger) {
        defaultClasses += " block w-40 text-white bg-red-500";
      }
    }

    if (size === "sm") {
      defaultClasses += " text-sm h-8 px-2 ";
    } else {
      defaultClasses += " h-12 px-4 ";
    }

    if (outlined) {
      if (secondary) {
        defaultClasses += " border-gray-400 border text-gray-600";
      } else if (success) {
        defaultClasses += " border-green-600 border text-green-500";
      } else if (danger) {
        defaultClasses += " border-red-500 border text-red-500";
      } else defaultClasses += " primary-self-text border-blue-400 border ";
    } else {
      if (secondary) {
        defaultClasses += " bg-gray-400 ";
      } else if (success) {
        defaultClasses += " bg-green-600 ";
      } else if (danger) {
        defaultClasses += " bg-red-500 ";
      } else defaultClasses += " primary-background-color ";
    }

    return defaultClasses;
  }, [block, danger, outlined, secondary, size, success]);

  return (
    <button
      type="button"
      className={buttonClasses}
      {...props}
      block={block.toString()}
    >
      {children}
    </button>
  );
}

export default Button;
