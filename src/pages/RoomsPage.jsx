import React from "react";
import { TextInput, Button } from "flowbite-react";
import { useDebounce } from "use-debounce";
import { SpinnerCircular } from "spinners-react";
import { BsSearch } from "react-icons/bs";
import { RoomItemComponent } from "../components/RoomItemComponent";

const RoomsPage = () => {
  const incrementAndLoadMore = () => {};

  return (
    <div className="m-auto sm:my-4">
      <div className="flex flex-row flex-wrap my-6 justify-center">
        <div className="text-gray-800 text-left whitespace-break-normal justify-center ">
          <p className="text-3xl">Search Rooms</p>
        </div>
      </div>
      <div className="flex flex-row justify-center lg:px-72 md:px-52 sm:px-0 px-5 my-4">
        <div className="w-4/5">
          <TextInput
            type="text"
            className="rounded-r-full"
            placeholder="Type place name here"
            required={true}
          />
        </div>
        <div className="w-1/5 px-0 md:px-2">
          <Button>
            <p className="hidden sm:flex">Search</p>
            <div className="px-2 py-2 sm:py-0">
              <BsSearch />
            </div>
          </Button>
        </div>
      </div>

      <div>
        <div className="grid lg:grid-cols-3 md:gird-cols-2 sm:grid-cols-1 place-items-center px-20">
          <RoomItemComponent />
          <RoomItemComponent />
          <RoomItemComponent />
          <RoomItemComponent />
          <RoomItemComponent />
          <RoomItemComponent />
          <RoomItemComponent />
        </div>
      </div>

      <div>
        <div className="flex flex-row my-3 justify-center">
          <Button size="xs" pill onClick={incrementAndLoadMore}>
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;
