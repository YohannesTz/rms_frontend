import React, { useState } from "react";
import { Button, Modal, Checkbox, Label, Spinner } from "flowbite-react";
import util from "../util/util.json";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import { BsFillCheckCircleFill, BsFillXOctagonFill } from "react-icons/bs";

export const RequestItemComponent = (props) => {
  const baseUrl = util.baseUrl;
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const authData = useAuthStore((state) => state.authData);
  const [isAccepting, setIsAccepting] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [result, setResult] = useState({});

  const handleAcceptReservation = (e) => {
    setIsAccepting(true);
    axios
      .put(
        baseUrl + `/api/reservations/accept/${props.request.id}`,
        {},
        {
          headers: {
            "x-auth-token": authData.token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setResult(response.data);
        setIsAccepting(false);
        setShowResultDialog(true);
      })
      .catch((err) => {
        console.log(err);
        setIsAccepting(false);
        setResult(err);
        setShowResultDialog(true);
      });
  };

  const handleRejectReservation = (e) => {
    setIsAccepting(true);
    axios
      .put(
        baseUrl + `/api/reservations/reject/${props.request.id}`,
        {},
        {
          headers: {
            "x-auth-token": authData.token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setResult(response.data);
        setIsAccepting(false);
        setShowResultDialog(true);
      })
      .catch((err) => {
        console.log(err);
        setIsAccepting(false);
        setResult(err);
        setShowResultDialog(true);
      });
  };

  const onResultClose = () => {
    setShowResultDialog(false);
  };

  return (
    <>
      <Modal show={showResultDialog} size="md" onClose={onResultClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {result.success ? (
              <div>
                <BsFillCheckCircleFill className="mx-auto mb-4 h-14 w-14 text-gray-600 " />
                <h3 className="mb-5 text-lg font-normal text-gray-600 ">
                  Success!
                </h3>
              </div>
            ) : (
              <div>
                <BsFillXOctagonFill className="mx-auto mb-4 h-14 w-14 text-gray-600 " />
                <h3 className="mb-5 text-lg font-normal text-gray-600 ">
                  {typeof result.error == "undefined"
                    ? " Unknwon error! "
                    : result.error.msg}
                </h3>
              </div>
            )}
            <div className="flex justify-center gap-4">
              <Button color="gray" pill size="xs" onClick={onResultClose}>
                Close
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        size="md"
        position="center"
        show={showDetailsDialog}
        onClose={() => setShowDetailsDialog(false)}
      >
        <Modal.Header>More Details</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-1 text-gray-800 text-xl mx-2">
            <h5 className="mb-1 text-xl font-medium break-words line-clamp-2 text-gray-500 ">
              <span className="text-gray-700 line-clamp-2">Summary:</span>
              {props.request.room.summary == null
                ? ""
                : props.request.room.summary}
            </h5>
            <h5 className="mb-1 text-xl font-medium break-words text-gray-500 ">
              <span className="text-gray-700">Total Bedrooms:</span>
              {props.request.room.total_bedrooms == null
                ? ""
                : props.request.room.total_bedrooms}
            </h5>
            <h5 className="mb-1 text-xl font-medium break-words text-gray-500 ">
              <span className="text-gray-700">Total Bathrooms:</span>
              {props.request.room.total_bathrooms == null
                ? ""
                : props.request.room.total_bathrooms}
            </h5>
            <h5 className="mb-1 text-xl font-medium break-words text-gray-500 ">
              <span className="text-gray-700">Total occupancy:</span>
              {props.request.room.total_occupancy == null
                ? ""
                : props.request.room.total_occupancy}
            </h5>

            <div className="grid grid-cols-2 text-gray-400">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="has_tv"
                  disabled={true}
                  checked={props.request.room.has_tv}
                />
                <Label htmlFor="has_tv">Television</Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="has_kitchen"
                  disabled={true}
                  checked={props.request.room.has_kitchen}
                />
                <Label htmlFor="has_kitchen">Kitchen</Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="has_air_con"
                  disabled={true}
                  checked={props.request.room.has_air_con}
                />
                <Label htmlFor="has_air_con">Air conditioner</Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="has_heating"
                  disabled={true}
                  checked={props.request.room.has_heating}
                />
                <Label htmlFor="has_heating">Heating</Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="has_internet"
                  disabled={true}
                  checked={props.request.room.has_internet}
                />
                <Label htmlFor="has_internet">Internet</Label>
              </div>

              <h5 className="mb-1 text-xl font-medium break-words line-clamp-2 text-gray-500 ">
                <span className="text-gray-700">Address:</span>{" "}
                {props.request.room.address == null
                  ? ""
                  : props.request.room.address}
              </h5>

              <h5 className="mb-1 text-xl font-medium break-words line-clamp-2 text-gray-500 ">
                <span className="text-gray-700">Price per night:</span>{" "}
                {props.request.room.price == null
                  ? ""
                  : props.request.room.price}
              </h5>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowDetailsDialog(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      <div className="hover:shadow-lg m-2 flex border rounded-lg p-8 justify-center text-gray-600">
        <div className="flex flex-wrap">
          <div className="flex flex-col px-5">
            <p className="text-2xl font-bold">Request Details</p>
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
              {props.request.total_price == null
                ? ""
                : props.request.total_price}
            </h5>

            <h5
              className="mb-1 text-xl text-center font-medium cursor-pointer mx-14 text-gray-600"
              onClick={() => setShowDetailsDialog(true)}
            >
              Show Details
            </h5>

            {isAccepting ? (
              <div className="flex flex-row justify-center">
                <Spinner />
              </div>
            ) : (
              <>
                {props.request.status.split(";")[0] == "pending" ? (
                  <div className="flex flex-row gap-2">
                    <Button size="xs" pill onClick={handleAcceptReservation}>
                      Accept
                    </Button>
                    <Button
                      size="xs"
                      pill
                      color="failure"
                      onClick={handleRejectReservation}
                    >
                      Decline
                    </Button>
                  </div>
                ) : (
                  <a
                    className="text-xl text-gray-600"
                    href={props.request.status.split(";")[1]}
                  >
                    Request was {props.request.status.split(";")[0]}
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
