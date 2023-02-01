import React from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const style = { fontSize: "1.5em" };

export const VisiblityButton = (props) => {
  return (
    <div>
      <button className="p-2 border rounded-md hover:bg-gray-200" onClick={props.onChecked}>
        {props.isVisible ? (<BsFillEyeFill style={style} />) : (
        <BsFillEyeSlashFill style={style} />)}
      </button>
    </div>
  );
};
