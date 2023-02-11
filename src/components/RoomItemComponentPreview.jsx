import React, { useState } from "react";
import { RatingBar } from "./RatingBar";
import { Carousel, Modal, Checkbox, Label, Button } from "flowbite-react";
import _ from "lodash";

export const RoomItemComponentPreview = (props) => {
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const onResultClose = () => {
    setShowDetailsDialog(false);
  };

  const showResultDialog = () => {
    setShowDetailsDialog(true);
  };

  return (
    <>
      <Modal show={showDetailsDialog} size="md" onClose={onResultClose}>
        <Modal.Header>Room Details</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-1 text-gray-800 text-xl mx-2">
            <h5 className="mb-1 text-xl font-medium break-words line-clamp-2 text-gray-500 ">
              <span className="text-gray-700 line-clamp-2">Summary:</span>
              {props.room.summary == null ? "" : props.room.summary}
            </h5>
            <h5 className="mb-1 text-xl font-medium break-words text-gray-500 ">
              <span className="text-gray-700">Total Bedrooms:</span>
              {props.room.total_bedrooms == null
                ? ""
                : props.room.total_bedrooms}
            </h5>
            <h5 className="mb-1 text-xl font-medium break-words text-gray-500 ">
              <span className="text-gray-700">Total Bathrooms:</span>
              {props.room.total_bathrooms == null
                ? ""
                : props.room.total_bathrooms}
            </h5>
            <h5 className="mb-1 text-xl font-medium break-words text-gray-500 ">
              <span className="text-gray-700">Total occupancy:</span>
              {props.room.total_occupancy == null
                ? ""
                : props.room.total_occupancy}
            </h5>

            <div className="grid grid-cols-2 text-gray-400">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="has_tv"
                  disabled={true}
                  checked={props.room.has_tv}
                />
                <Label htmlFor="has_tv">Television</Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="has_kitchen"
                  disabled={true}
                  checked={props.room.has_kitchen}
                />
                <Label htmlFor="has_kitchen">Kitchen</Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="has_air_con"
                  disabled={true}
                  checked={props.room.has_air_con}
                />
                <Label htmlFor="has_air_con">Air conditioner</Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="has_heating"
                  disabled={true}
                  checked={props.room.has_heating}
                />
                <Label htmlFor="has_heating">Heating</Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="has_internet"
                  disabled={true}
                  checked={props.room.has_internet}
                />
                <Label htmlFor="has_internet">Internet</Label>
              </div>

              <h5 className="mb-1 text-xl font-medium break-words line-clamp-2 text-gray-500 ">
                <span className="text-gray-700">Address:</span>{" "}
                {props.room.address == null ? "" : props.room.address}
              </h5>

              <h5 className="mb-1 text-xl font-medium break-words line-clamp-2 text-gray-500 ">
                <span className="text-gray-700">Price per night:</span>{" "}
                {props.room.price == null ? "" : props.room.price}
              </h5>
            </div>

            {!props.room.is_available && (
              <div className="bg-red-200 text-red-700 p-2 my-1 rounded-lg">
                <p>
                  Oops! this room was checked as unavailable by Lord. booking is
                  not available.
                </p>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onResultClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      <div className="flex flex-col flex-shrink rounded-lg shadow hover:shadow-lg overflow-hidden m-2">
        {props.room.medias.length == 0 ? (
          <div
            data-placeholder
            className="h-[200px] w-[300px] rounded-md bg-gray-200"
          />
        ) : (
          <Carousel className="h-[200px] w-[300px]">
            {props.room.medias &&
              props.room.medias.map((image) => {
                return (
                  <img
                    src={image.file_url}
                    alt="Room Image"
                    className="rounded-md w-[300px] h-[200px]"
                  />
                );
              })}
          </Carousel>
        )}
        <div className="px-4 py-4 text-left">
          <div className="font-bold cursor-pointer text-xl mb-2" onClick={showResultDialog}>
            {props.room.address}
          </div>
          <RatingBar value={_.random(1, 5)} />
          <p className="text-gray-700 text-base">{props.room.price} ETB</p>
        </div>
      </div>
    </>
  );
};
