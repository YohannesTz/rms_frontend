import { Button } from "flowbite-react";
import React, { useState } from "react";

const GetStarted = () => {
  const [selectedType, setSelectedType] = useState("client");

  const handleRadioChange = (event) => {
    console.log(event.target.value);
    setSelectedType(event.target.value);
  };
  return (
    <div className="py-10 flex flex-row justify-center">
      <div className="flex flex-col justify-center">
        <div className="flex flex-row justify-center">
          <h5 className="text-xl font-bold tracking-tight py-4 text-gray-900 ">
            Join as Landlord or Client
          </h5>
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          <label
            htmlFor="client-card"
            className="relative flex flex-col bg-white p-5 rounded-lg shadow-md cursor-pointer"
          >
            <span className="font-semibold text-gray-500 leading-tight uppercase mb-3">
              Landlord
            </span>
            <span className="font-bold text-gray-900">
              <span className="text-4xl">I want rent my house</span>
            </span>
            <input
              type="radio"
              name="join-type"
              id="client-card"
              value="client"
              checked={selectedType === "client"}
              onChange={handleRadioChange}
              className="absolute h-0 w-0 appearance-none"
            />
            <span
              aria-hidden="true"
              className="hidden absolute inset-0 border-2 border-blue-500 bg-green-200 bg-opacity-10 rounded-lg"
            >
              <span className="absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-green-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-green-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </span>
          </label>
          <label
            htmlFor="talent-card"
            className="relative flex flex-col bg-white p-5 rounded-lg shadow-md cursor-pointer"
          >
            <span className="font-semibold text-gray-500 leading-tight uppercase mb-3">
              Client
            </span>
            <span className="font-bold text-gray-900">
              <span className="text-4xl">I want to find a room</span>
            </span>
            <input
              type="radio"
              name="join-type"
              id="talent-card"
              value="talent"
              checked={selectedType === "talent"}
              onChange={handleRadioChange}
              className="absolute h-0 w-0 appearance-none"
            />
            <span
              aria-hidden="true"
              className="hidden absolute inset-0 border-2 border-blue-500 bg-green-200 bg-opacity-10 rounded-lg"
            >
              <span className="absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-green-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-green-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </span>
          </label>
        </div>
        <div className="flex flex-row justify-center py-5 gap-2">
          <Button
            pill
            size="xs"
            href={selectedType === "client" ? "/join-landlord" : "/join-client"}
          >
            {selectedType === "client"
              ? "Join as a Landlord"
              : "Join as a Client"}
          </Button>
          <Button
            pill
            size="xs"
            color="light"
            href={
              selectedType === "client" ? "/signin" : "/signin"
            }
          >
            {selectedType === "client"
              ? "SignIn as a LandLord"
              : "SignIn as a Client"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
