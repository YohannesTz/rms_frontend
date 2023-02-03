import { Rating } from "flowbite-react";
import React from "react";
import { RatingBar } from "./RatingBar";
import _ from "lodash";

export const RoomItemComponent = (props) => {
  return (
    <div>
      <div className="rounded-lg overflow-hidden shadow-lg m-5">
        <img
          src="https://picsum.photos/300/200"
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
          <RatingBar value={_.random(0, 5)} />
          <p className="text-gray-700 text-base"> 700$</p>
        </div>
      </div>
    </div>
  );
};
