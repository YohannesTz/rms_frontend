import React from "react";
import { Card, Button } from "flowbite-react";

export const RequestItemComponent = (props) => {
  return (
    <div className="hover:shadow-lg m-2 border rounded-lg p-10 text-gray-600">
      <div className="flex flex-wrap">
        <div className="flex flex-col px-5">
          <p className="text-2xl font-bold">Request Details</p>
          <h5 className="mb-1 text-xl font-medium break-words text-gray-500 ">
            <span className="text-gray-700 line-clamp-2">RoomId:</span>
            {props.request.roomId == null ? "" : props.request.roomId}
          </h5>
          <h5 className="mb-1 text-xl font-medium break-words text-gray-500 ">
            <span className="text-gray-700">Start Date: </span>
            {props.request.start_date == null ? "" : props.request.start_date}
          </h5>
          <h5 className="mb-1 text-xl font-medium break-words text-gray-500 ">
            <span className="text-gray-700">End date:</span>
            {props.request.end_date == null ? "" : props.request.end_date}
          </h5>
          <h5 className="mb-1 text-xl font-medium break-words text-gray-500 ">
            <span className="text-gray-700">Total price:</span>
            {props.request.total_price == null ? "" : props.request.total_price}
          </h5>

          <div className="flex flex-row gap-2">
            <Button size="xs" pill>
              Accept
            </Button>
            <Button size="xs" pill color="failure">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
