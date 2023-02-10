import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import Lottie from "lottie-react";
import notFoundAnimation from "../assets/empty_ghost.json";
import util from "../util/util.json";
import {
  Button,
  Modal,
  TextInput,
  Textarea,
  Label,
  Spinner,
  Select,
  Checkbox,
  Tabs,
} from "flowbite-react";
import { BsFillCheckCircleFill, BsFillXOctagonFill } from "react-icons/bs";
import axios from "axios";
import { RoomItemComponent } from "../components/RoomItemComponent";
import { SpinnerCircular } from "spinners-react";

const style = {
  height: 350,
  width: 350,
};

const ClientViewPage = () => {
  const authData = useAuthStore((state) => state.authData);
  const baseUrl = util.baseUrl;
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    home_type: "Hotel",
    room_type: "normal",
    total_occupancy: 1,
    total_bedrooms: 1,
    total_bathrooms: 1,
    summary: "",
    address: "",
    has_tv: false,
    has_kitchen: false,
    has_air_con: false,
    has_internet: false,
    has_heating: false,
    price: 5,
    date: new Date().toISOString(),
    latitude: "",
    longtude: "",
    is_available: true,
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [isPosting, setIsPosting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [result, setResult] = useState({});
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [tabMode, setTabMode] = useState("listings");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(baseUrl + `/api/rooms/lordId/${authData.id}`)
      .then((response) => {
        setRooms(response.data.data.rooms);
        setIsLoading(false);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { value } = e.target;

    setFormValues({
      ...formValues,
      [e.target.id]: value,
    });
    console.log(formValues);
  };

  const handleCheckChanges = (e) => {
    console.log(e.target.checked);
    setFormValues({
      ...formValues,
      [e.target.id]: !formValues[e.target.id],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    setIsPosting(true);

    axios
      .post(baseUrl + "/api/rooms/create", formValues)
      .then((response) => {
        console.log(response);
        setResult(response.data);
        setIsPosting(false);
        setShowDialog(false);
        setShowResultDialog(true);
        setFormValues(initialValues);
      })
      .catch((error) => {
        console.log(error);
        setIsPosting(false);
      });
  };

  const onClose = () => {
    setShowDialog(false);
  };

  const openDialog = () => {
    setShowDialog(true);
  };

  const onResultClose = () => {
    setShowResultDialog(false);
  };

  return (
    <div>
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

      <Modal show={showDialog} position="top-center" onClose={onClose}>
        <Modal.Header>Create a Room Listing</Modal.Header>
        <Modal.Body>
          <div className="overflow-auto">
            <div>
              <div>
                <div className="block">
                  <Label
                    htmlFor="home_type"
                    value="Select your organization type"
                  />
                </div>
                <Select
                  id="home_type"
                  required={true}
                  onChange={(e) =>
                    setFormValues({ ...formValues, home_type: e.target.value })
                  }
                >
                  <option value="Hotel">Hotel</option>
                  <option value="Condominum">Condominum</option>
                  <option value="Pension">Pension</option>
                  <option value="Apartment">Apartment</option>
                </Select>
              </div>
            </div>

            <div className="my-4">
              <div className="mb-2 block">
                <Label htmlFor="total_occupancy" value="Total Occupancy" />
              </div>
              <TextInput
                id="total_occupancy"
                type="number"
                min="1"
                max="10"
                placeholder="Please input the number of people who can live here"
                required={true}
                value={formValues.total_occupancy}
                onChange={handleInputChange}
              />
            </div>

            <div className="my-4">
              <div className="mb-2 block">
                <Label
                  htmlFor="total_bedrooms"
                  value="Total Bedrooms & Bathroom"
                />
              </div>
              <div className="flex flex-row gap-4">
                <TextInput
                  id="total_bedrooms"
                  type="number"
                  min="1"
                  max="10"
                  className="grow"
                  placeholder="number of bedrooms"
                  required={true}
                  value={formValues.total_bedrooms}
                  onChange={handleInputChange}
                />
                <TextInput
                  id="total_bathrooms"
                  type="number"
                  min="1"
                  max="10"
                  className="grow"
                  placeholder="number of bathrooms"
                  required={true}
                  value={formValues.total_bathrooms}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="my-4">
              <div className="mb-2 block">
                <Label htmlFor="summary" value="Summary" />
              </div>
              <Textarea
                id="summary"
                type="text"
                placeholder="Please input summary"
                required={true}
                rows={3}
                value={formValues.summary}
                onChange={handleInputChange}
              />
            </div>

            <div className="my-4">
              <div className="mb-2 block">
                <Label htmlFor="address" value="Address" />
              </div>
              <TextInput
                id="address"
                type="text"
                placeholder="Please input the room address"
                required={true}
                value={formValues.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="my-4">
              <div className="mb-2 block">
                <Label htmlFor="details" value="Details" />
              </div>

              <div className="grid grid-rows-2 gap-4 mx-1">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="has_tv"
                    onChange={handleCheckChanges}
                    checked={formValues.has_tv}
                  />
                  <Label htmlFor="has_tv">Television</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="has_kitchen"
                    onChange={handleCheckChanges}
                    checked={formValues.has_kitchen}
                  />
                  <Label htmlFor="has_kitchen">Kitchen</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="has_air_con"
                    onChange={handleCheckChanges}
                    checked={formValues.has_air_con}
                  />
                  <Label htmlFor="has_air_con">Air conditioner</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="has_heating"
                    onChange={handleCheckChanges}
                    checked={formValues.has_heating}
                  />
                  <Label htmlFor="has_heating">Heating</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="has_internet"
                    onChange={handleCheckChanges}
                    checked={formValues.has_internet}
                  />
                  <Label htmlFor="has_internet">Internet</Label>
                </div>
              </div>
            </div>

            <div className="my-4">
              <div className="mb-2 block">
                <Label value="Price per night" />
              </div>
              <TextInput
                id="price"
                type="number"
                min="5"
                max="1000"
                placeholder="Please input the price per night"
                required={true}
                value={formValues.price}
                onChange={handleInputChange}
              />
            </div>

            <div className="my-4">
              <div className="mb-2 block">
                <Label value="Room Location" />
              </div>
              <div className="flex flex-row gap-4">
                <TextInput
                  id="latitude"
                  type="text"
                  className="grow"
                  placeholder="Latitude"
                  required={true}
                  value={formValues.latitude}
                  onChange={handleInputChange}
                />
                <TextInput
                  id="longtude"
                  type="text"
                  className="grow"
                  placeholder="Longtitude"
                  required={true}
                  value={formValues.longtude}
                  onChange={handleInputChange}
                />
              </div>
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
              <Button size="xs" color="gray" onClick={onClose}>
                Cancel
              </Button>
            </div>
          )}
        </Modal.Footer>
      </Modal>

      <div className="flex flex-row gap-3 flex-wrap my-6 justify-center">
        <div className="text-gray-700 text-left whitespace-break-normal justify-center ">
          <p className="text-2xl">Hi {authData.firstName}, your listings </p>
        </div>
        <div className="py-0">
          <Button size="xs" pill onClick={openDialog}>
            Create
          </Button>
        </div>
      </div>

       <div className="flex flex-row md:px-24">
        <Tabs.Group aria-label="Pills" style="underline">
          <Tabs.Item active={true} title="Listings">
            <div className="flex flex-row h-screen justify-center">
              {isLoading && (
                <div className="flex flex-row my-10 justify-center">
                  <SpinnerCircular
                    size={58}
                    thickness={100}
                    speed={100}
                    color="rgba(58, 0, 162, 1)"
                    secondaryColor="rgba(0, 0, 0, 0.44)"
                  />
                </div>
              )}
              {!isLoading && rooms.length == 0 ? (
                <div className="m-auto">
                  <Lottie
                    animationData={notFoundAnimation}
                    style={style}
                    loop={true}
                  />
                  <p className="text-xl text-gray-800 text-center">
                    Oops! seems like you don't have any rooms listed
                  </p>
                  <div className="flex flex-row my-6 justify-center">
                    <div className="py-0">
                      <Button size="xs" pill href="/">
                        Return Home
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-2 overflow-y-scroll ">
                  {rooms.map((roomItem) => {
                    return (
                      <RoomItemComponent
                        room={roomItem}
                        key={roomItem.id.toString()}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </Tabs.Item>
          <Tabs.Item title="Requests">your Requests</Tabs.Item>
        </Tabs.Group>
      </div>
    </div>
  );
};

export default ClientViewPage;
