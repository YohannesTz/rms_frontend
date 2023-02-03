import { Rating } from "flowbite-react";
import React from "react";
import { RatingBar } from "./RatingBar";
import _ from "lodash";

export const RoomItemComponent = (props) => {
  return (
    <div>
      <div className="rounded-lg hover:shadow-lg overflow-hidden m-2">
        <img
          src="https://picsum.photos/300/200"
          alt="Sunset in the mountains"
          className="rounded-md"
        />
        <div className="px-4 py-4 text-left">
          <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
          <RatingBar value={_.random(1, 5)} />
          <p className="text-gray-700 text-base"> 700$</p>
        </div>
      </div>
    </div>
  );
};
