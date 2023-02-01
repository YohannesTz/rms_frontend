import React from "react";

export const Chips = (props) => {
  return (
    <div>
      <span className="px-4 py-1 mx-1 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
        {props.text}
      </span>
    </div>
  );
};
