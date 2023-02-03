import React from "react";
import util from "../util/util.json";

const CarouselItemComponent = (props) => {
  return (
    <div className="flex flex-col md:flex-row justify-center py-10">
      <div className="p-4 md:px-8">
        <img
          src={props.imageUrl}
          alt="..."
          className="shadow-lg rounded-l-lg max-w-full align-middle border-none"
          width="400"
          height="400"
        />
      </div>
      <div className="md:my-4">
        <div className="text-gray-800 text-left whitespace-break-normal">
          <p className="text-3xl py-3 md:py-0">{props.title}</p>
          <p className="my-5">{props.content}</p>
        </div>
      </div>
    </div>
  );
};

export default CarouselItemComponent;
