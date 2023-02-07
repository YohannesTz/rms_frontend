import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import secrets from "../../secret.json";
import { OverlayView } from "@react-google-maps/api";
import axios from "axios";
import util from "../util/util.json";

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

const hm = {
  lat: 9.242247,
  lng: 38.44433,
};

const apiKey = secrets.GOOGLE_MAPS_API_KEY;

const MapsPage = () => {
  let baseUrl = util.baseUrl;
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const skip = 0,
    take = 5;

  useEffect(() => {
    const fetchRooms = async () => {
      axios
        .get(baseUrl + `/api/rooms?skip=${skip}&take=${take}`)
        .then((response) => {
          setRooms([...rooms, ...response.data.data.rooms]);
        });
    };
    fetchRooms().catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // console.log(selectedRoom);
  }, [selectedRoom]);

  return (
    <div className="flex flex-row gap-2 my-2 h-max rounded-md">
      <div className="w-2/6 rounded-lg border flex-1 md:w-0 h-screen">
        <Sidebar>

          <div className="flex flex-col gap-3 px-2">
            <p>Room Details</p>
            <p>Id: {selectedRoom.id}</p>
            <p className="break-word">Summary: {selectedRoom.summary}</p>
            <p className="break-word">
              Total Bedrooms: {selectedRoom.total_bedrooms}
            </p>
            <p className="break-word">
              Total Bathrooms: {selectedRoom.total_bathrooms}
            </p>
            <p className="break-word">Summary: {selectedRoom.summary}</p>
          </div>
        </Sidebar>
      </div>

      <div className="w-4/6 md:w-5/5 block">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
          >
            {rooms.map((roomItem) => {
              console.log(roomItem);
              return (
                <MarkerF
                  position={{
                    lat: +roomItem.latitude,
                    lng: +roomItem.longtude,
                  }}
                  onClick={() => {
                    setSelectedRoom(roomItem);
                  }}
                />
              );
            })}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default MapsPage;
