import React from "react";
import { Sidebar } from "flowbite-react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 9.005401,
  lng: 38.763611,
};

const MapsPage = () => {
  return (
    <div className="flex flex-row gap-2 rounded-md">
      <div className="w-1/5 shadow-lg rounded-lg border flex-1">
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

      <div className="w-4/5">
        <LoadScript googleMapsApiKey="">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            <Marker position={center}/>
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default MapsPage;
