import React, { useEffect, useState } from "react";
import {
  TextInput,
  Label,
  Checkbox,
  Button,
  Modal,
  Spinner,
} from "flowbite-react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import secrets from "../../secret.json";
import axios from "axios";
import util from "../util/util.json";
import emptyStateLottie from "../assets/empty_state_cards.json";
import Lottie from "lottie-react";
import { useAuthStore } from "../store/authStore";
import { BsFillCheckCircleFill, BsFillXOctagonFill } from "react-icons/bs";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 9.005401,
  lng: 38.763611,
};

const myHome = {
  lat: 9.042247,
  lng: 38.84433,
};

const style = {
  height: 300,
  width: 300,
};

const apiKey = secrets.GOOGLE_MAPS_API_KEY;

const MapsPage = () => {
  let baseUrl = util.baseUrl;
  const authData = useAuthStore((state) => state.authData);

  const initialValues = {
    userId: authData.id,
    roomId: 0,
    start_date: null,
    end_date: null,
    price: 0, // I know, this is a bad Idea. price of anything shouldn't be sent from the client
    lordId: 0,
  };

  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [infoOpen, setInfoOpen] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [showBookDialog, setShowBookDialog] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [isPosting, setIsPosting] = useState(false);
  const [result, setResult] = useState({});
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  const closeDialog = () => {
    setShowBookDialog(false);
  };

  const skip = 0,
    take = 10;

  useEffect(() => {
    const fetchRooms = async () => {
      axios
        .get(baseUrl + `/api/rooms?skip=${skip}&take=${take}`)
        .then((response) => {
          setRooms([...rooms, ...response.data.data.rooms]);
        });
    };
    fetchRooms().catch((err) => console.log(err));
  }, [skip]);

  useEffect(() => {
    // console.log(selectedRoom);
  }, [selectedRoom]);

  const handleInputChange = (e) => {
    const { value } = e.target;

    setFormValues({
      ...formValues,
      userId: authData.id,
      [e.target.id]: value,
      roomId: selectedRoom.id,
      price: selectedRoom.price,
      lordId: selectedRoom.landLordId,
    });

    let startDate = new Date(formValues.start_date);
    let endDate = new Date(formValues.end_date);
    let diff = endDate.getTime() - startDate.getTime();
    let datesInbetween = Math.ceil(diff / (1000 * 3600 * 24));

    let totalPrice = +selectedRoom.price;
    console.log(startDate.getTime() + ", " + endDate.getTime());
    console.log("datesInbtwn", datesInbetween);

    if (datesInbetween > 1) {
      totalPrice = +selectedRoom.price * datesInbetween;
    }

    setCalculatedPrice(totalPrice);
    console.log(calculatedPrice);

    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPosting(true);

    axios
      .post(baseUrl + "/api/reservations/create", formValues)
      .then((response) => {
        console.log(response);
        setResult(response.data);
        setIsPosting(false);
        setShowBookDialog(false);
        setShowResultDialog(true);
        console.log(result.success);
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
        show={showBookDialog}
        position="top-center"
        size="md"
        onClose={closeDialog}
      >
        <Modal.Header>Book this room</Modal.Header>
        <Modal.Body>
          <div className="overflow-auto">
            <div className="my-4">
              <div className="mb-2 block">
                <Label value="Start and End date " />
              </div>
              <div className="flex flex-row gap-4 my-2">
                <TextInput
                  id="start_date"
                  type="date"
                  className="grow"
                  min={new Date().toISOString()}
                  placeholder="Starting date"
                  required={true}
                  value={formValues.start_date}
                  onChange={handleInputChange}
                />
                <TextInput
                  id="end_date"
                  type="date"
                  className="grow"
                  min={new Date().toISOString()}
                  placeholder="End date"
                  required={true}
                  value={formValues.end_date}
                  onChange={handleInputChange}
                />
              </div>
             {/*  <div className="mb-2 block">
                <Label value="Price" className="my-3" />
                <p className="text-2xl">{calculatedPrice} ETB</p>
              </div> */}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {isPosting ? (
            <div className="flex flex-row justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="flex flex-row gap-3">
              <Button
                size="xs"
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
              >
                Post
              </Button>
              <Button size="xs" color="gray" onClick={closeDialog}>
                Cancel
              </Button>
            </div>
          )}
        </Modal.Footer>
      </Modal>
      <div className="flex flex-row gap-2 my-2 h-max rounded-lg">
        <div className="w-2/6 rounded-lg border-2 flex-1 md:w-0 h-screen">
          {Object.keys(selectedRoom).length === 0 ? (
            <div className="flex flex-col gap-2 place-content-center">
              <div className="m-auto">
                <Lottie
                  animationData={emptyStateLottie}
                  style={style}
                  loop={true}
                />

                <p className="text-xl text-center text-gray-700">
                  Please select a home on the map!
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1 text-gray-800 text-xl py-4 px-10">
              <p className="text-2xl font-bold">Details</p>
              <h5 className="mb-1 text-xl font-medium break-words line-clamp-2 text-gray-500 ">
                <span className="text-gray-700 line-clamp-2">Summary:</span>
                {selectedRoom.summary == null ? "" : selectedRoom.summary}
              </h5>
              <h5 className="mb-1 text-xl font-medium break-words text-gray-500 ">
                <span className="text-gray-700">Total Bedrooms:</span>
                {selectedRoom.total_bedrooms == null
                  ? ""
                  : selectedRoom.total_bedrooms}
              </h5>
              <h5 className="mb-1 text-xl font-medium break-words text-gray-500 ">
                <span className="text-gray-700">Total Bathrooms:</span>
                {selectedRoom.total_bathrooms == null
                  ? ""
                  : selectedRoom.total_bathrooms}
              </h5>
              <h5 className="mb-1 text-xl font-medium break-words text-gray-500 ">
                <span className="text-gray-700">Total occupancy:</span>
                {selectedRoom.total_occupancy == null
                  ? ""
                  : selectedRoom.total_occupancy}
              </h5>

              <div className="grid grid-rows-2 gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="has_tv"
                    disabled={true}
                    checked={selectedRoom.has_tv}
                  />
                  <Label htmlFor="has_tv">Television</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="has_kitchen"
                    disabled={true}
                    checked={selectedRoom.has_kitchen}
                  />
                  <Label htmlFor="has_kitchen">Kitchen</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="has_air_con"
                    disabled={true}
                    checked={selectedRoom.has_air_con}
                  />
                  <Label htmlFor="has_air_con">Air conditioner</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="has_heating"
                    disabled={true}
                    checked={selectedRoom.has_heating}
                  />
                  <Label htmlFor="has_heating">Heating</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="has_internet"
                    disabled={true}
                    checked={selectedRoom.has_internet}
                  />
                  <Label htmlFor="has_internet">Internet</Label>
                </div>

                <h5 className="mb-1 text-xl font-medium break-words line-clamp-2 text-gray-500 ">
                  <span className="text-gray-700">Address:</span>{" "}
                  {selectedRoom.address == null ? "" : selectedRoom.address}
                </h5>

                <h5 className="mb-1 text-xl font-medium break-words line-clamp-2 text-gray-500 ">
                  <span className="text-gray-700">Price per night:</span>{" "}
                  {selectedRoom.price == null ? "" : selectedRoom.price}
                </h5>
              </div>

              {!selectedRoom.is_available && (
                <div className="bg-red-200 text-red-700 p-2 my-1 rounded-lg">
                  <p>
                    Oops! this room was checked as unavailable by Lord. booking
                    is not available.
                  </p>
                </div>
              )}

              <Button
                disabled={!selectedRoom.is_available}
                className="my-3"
                onClick={(e) => {
                  setShowBookDialog(true);
                }}
              >
                Book
              </Button>
            </div>
          )}
        </div>

        <div className="w-4/6 md:w-5/5 h-screen">
          <LoadScript
            googleMapsApiKey={apiKey}
            onLoad={() => setIsMapLoading(false)}
          >
            {isMapLoading ? (
              <p>Map is loading</p>
            ) : (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
              >
                {rooms.map((roomItem) => {
                  return (
                    <MarkerF
                      position={{
                        lat: +roomItem.latitude,
                        lng: +roomItem.longtude,
                      }}
                      onClick={() => {
                        setSelectedRoom(roomItem);
                      }}
                      icon={{
                        // path: google.maps.SymbolPath.CIRCLE,
                        url: "../../public/images/home_icon_35.png",
                        fillColor: "#EB00FF",
                        scale: 4,
                      }}
                    />
                  );
                })}

                {infoOpen && selectedRoom && (
                  <InfoWindow onCloseClick={() => setInfoOpen(false)}>
                    <div>
                      <h3>{selectedRoom.id}</h3>
                      <div>This is your info window content</div>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            )}
          </LoadScript>
        </div>
      </div>
    </>
  );
};

export default MapsPage;
