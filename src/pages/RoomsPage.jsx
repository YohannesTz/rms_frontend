import React, { useEffect, useState } from "react";
import { TextInput, Button } from "flowbite-react";
import { useDebounce } from "use-debounce";
import { SpinnerCircular } from "spinners-react";
import { BsSearch } from "react-icons/bs";
import Lottie from "lottie-react";
import notFoundAnimation from "../assets/empty_ghost.json";
import util from "../util/util.json";
import axios from "axios";
import { RoomItemComponentPreview } from "../components/RoomItemComponentPreview";

const style = {
  height: 350,
  width: 350,
};

const RoomsPage = () => {
  const baseUrl = util.baseUrl;
  const incrementAndLoadMore = () => {};
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [value] = useDebounce(query, 1000);

  const skip = 0,
    take = 10;

  useEffect(() => {
    setIsLoading(true);
    const fetchRooms = async () => {
      axios
        .get(baseUrl + `/api/rooms?skip=${skip}&take=${take}`)
        .then((response) => {
          setRooms([...rooms, ...response.data.data.rooms]);
          setIsLoading(false);
        });
    };
    fetchRooms().catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
  }, [skip]);

  const handleSearchInput = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      axios
        .get(baseUrl + `/api/rooms/${query}?skip=${skip}&take=${take}`)
        .then((response) => {
          setRooms(response.data.data.result);
          setIsLoading(false);
          console.log(response);
        });
    };

    if (query) {
      fetchData().catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    } else {
      const fetchRooms = async () => {
        axios
          .get(baseUrl + `/api/rooms?skip=${skip}&take=${take}`)
          .then((response) => {
            setRooms([...rooms, ...response.data.data.rooms]);
            setIsLoading(false);
          });
      };
      fetchRooms().catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    }
  }, [value]);

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
            value={query}
            onChange={handleSearchInput}
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

      <div className="flex-1 flex-row sm:px-10 md:px-10 lg:px-20">
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
              Oops! seems like there are no rooms listed
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
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-2 md:mx-10 lg:mx-20 place-content-center place-items-center sm:mx-10  ">
            {rooms.map((roomItem) => {
              return (
                <RoomItemComponentPreview
                  room={roomItem}
                  key={roomItem.id.toString()}
                />
              );
            })}
          </div>
        )}
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
