import React from "react";
import { Button, Carousel } from "flowbite-react";
import Lottie from "lottie-react";
import workLottieAnimaiton from "../assets/work_animation.json";
import manCodingLottieAnimation from "../assets/man_working_white.json";
import util from "../util/util.json";

const style = {
  height: 400,
  width: 400,
};

const style_two = {
  height: 300,
  width: 300,
};

const HomePage = () => {
  return (
    <div>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2">
        <div className="text-gray-800 text-left whitespace-break-normal ">
          <p className="text-5xl sm:text-4xl py-5">
            {util.configuration.bigHeadLine}
          </p>

          <p className="text-lg">{util.configuration.subHeadLine}</p>
          <div className="flex flex-row my-6">
            <div>
              <Button size="xs" pill href="/get-started">
                Get started
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Lottie animationData={workLottieAnimaiton} loop={true} />
        </div>
      </div>

      <div className="py-10 z-0">
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-10 py-5">
          <div className="text-gray-800 text-left whitespace-break-normal ">
            <p className="text-2xl">Our Mission</p>
            <p>{util.configuration.ourMission}</p>
          </div>
          <div></div>
        </div>

        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-10 py-5">
          <div>
            <Lottie
              animationData={manCodingLottieAnimation}
              loop={true}
              style={style_two}
            />
          </div>
          <div className="text-gray-800 text-left whitespace-break-normal ">
            <p className="text-2xl">Our Vision</p>
            <p>{util.configuration.ourVision}</p>
          </div>
        </div>
      </div>

      <div className="h-60 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel>
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
            alt="..."
          />
        </Carousel>
      </div>
    </div>
  );
};

export default HomePage;
