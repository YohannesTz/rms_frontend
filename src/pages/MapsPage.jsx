import React from "react";
import { Sidebar } from "flowbite-react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import secrets from "../../secret.json";

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

const apiKey = import.meta.env.GOOGLE_MAP_API_KEY
console.log(apiKey);

const MapsPage = () => {
  return (
    <div className="flex flex-row gap-2 my-10 h-max rounded-md">
      <div className="w-1/5 rounded-lg border flex-1 md:w-0">
        <Sidebar aria-label="Default sidebar example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="#">Dashboard</Sidebar.Item>
              <Sidebar.Item href="#" label="Pro" labelColor="alternative">
                Kanban
              </Sidebar.Item>
              <Sidebar.Item href="#" label="3">
                Inbox
              </Sidebar.Item>
              <Sidebar.Item href="#">Users</Sidebar.Item>
              <Sidebar.Item href="#">Products</Sidebar.Item>
              <Sidebar.Item href="#">Sign In</Sidebar.Item>
              <Sidebar.Item href="#">Sign Up</Sidebar.Item>
              <Sidebar.Item href="#">Users</Sidebar.Item>
              <Sidebar.Item href="#">Products</Sidebar.Item>
              <Sidebar.Item href="#">Sign In</Sidebar.Item>
              <Sidebar.Item href="#">Sign Up</Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>

      <div className="w-4/5 md:w-5/5 block">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
          >
            <MarkerF
              key={`lat-${myHome.lat}-lng-${myHome.lng}`}
              position={myHome}
            />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default MapsPage;
