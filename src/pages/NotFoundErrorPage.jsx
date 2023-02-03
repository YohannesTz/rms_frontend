import React from "react";
import Lottie from "lottie-react";
import notFoundAnimation from "../assets/error-page-not-found-confused-robot.json";
import { Button } from "flowbite-react";

const style = {
  height: 350,
  width: 350,
};

const NotFoundErrorPage = () => {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <Lottie animationData={notFoundAnimation} style={style} loop={true} />
        <p className="text-2xl text-gray-800 text-center">
          Oops! we couldn't find that page
        </p>
        <div className="flex flex-row my-6 justify-center">
          <div className="py-0">
            <Button size="xs" pill href="/">
              Return Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundErrorPage;
