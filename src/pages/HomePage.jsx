import React from "react";
import { Button, Carousel } from "flowbite-react";
import Lottie from "lottie-react";
import workLottieAnimaiton from "../assets/man_using_phone.json";
import manCodingLottieAnimation from "../assets/enjoy-beach-vacation.json";
import lookingForanAdress from "../assets/location_pin.json";
import util from "../util/util.json";
import CarouselItemComponent from "../components/CarouselItemComponent";

const style = {
  height: 400,
  width: 350,
};

const style_two = {
  height: 400,
  width: 400,
};

const HomePage = () => {
  return (
    <div className="justify-center md:px-10 lg:px-18">
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 place-items-center">
        <div className="text-gray-800 text-left whitespace-break-normal ">
          <p className="text-4xl sm:text-3xl py-5">
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
          <Lottie
            animationData={workLottieAnimaiton}
            style={style}
            loop={true}
          />
        </div>
      </div>

      <div>
        <div class="container mx-auto py-20 lg:px-12 sm:px-5 text-gray-800">
          <p className="text-4xl sm:text-3xl text-center text-gray-800 py-5">
            Why Us?
          </p>
          <div class="grid lg:grid-cols-3 gap-6">
            <div class="p-3 bg-white shadow-md hover:shadow-lg rounded-2xl px-5 py-6">
              <span class="font-bold text-xl">Easy</span>

              <p class="mt-2 text-justify">
                Our website offers a simple, user-friendly platform that allows
                you to quickly and easily book rooms from the comfort of your
                own home. With our intuitive search engine, you can find the
                perfect room in just a few clicks. Plus, our secure payment
                system ensures that your personal information is kept safe and
                secure. So why wait? Book your next room today with our website
                and experience the ease of online booking!
              </p>
            </div>

            <div class="p-3 bg-white shadow-md hover:shadow-lg rounded-2xl px-5 py-6">
              <span class="font-bold text-xl">Affordable</span>

              <p class="mt-2 text-justify">
                Our website offers a convenient and cost-effective way to book
                rooms online. With our easy-to-use platform, you can quickly
                search for the best deals on hotels, motels, and other
                accommodations. We compare prices from hundreds of providers so
                you can find the lowest rates available. Plus, we offer
                exclusive discounts and special offers that can help you save
                even more money. So why wait? Book your next room today and
                start saving!
              </p>
            </div>

            <div class="p-3 bg-white shadow-md hover:shadow-lg rounded-2xl px-5 py-6">
              <span class="font-bold text-xl">Reliable</span>

              <p class="mt-2 text-justify">
                Our website offers a secure and convenient way to book rooms
                online. We provide an easy-to-use platform that allows you to
                search for the best deals on hotels, motels, and other
                accommodations. Our website is regularly updated with the latest
                prices and availability, so you can be sure that you are getting
                the best deal. We also offer 24/7 customer service support in
                case you have any questions or concerns. With our website,
                booking rooms online is fast, secure, and hassle-free!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10">
        <div className="grid md:grid-cols-2 sm:grid-cols-1 py-5 gap-2 place-items-center">
          <div className="text-gray-800 text-left whitespace-break-normal ">
            <p className="text-2xl">Our Mission</p>
            <p>{util.configuration.ourMission}</p>
          </div>
          <div>
            <Lottie
              animationData={lookingForanAdress}
              loop={true}
              style={style_two}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 sm:grid-cols-1 py-5 place-items-center">
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

      {/* <div className="h-60 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel>
          <CarouselItemComponent
            imageUrl={"https://picsum.photos/200"}
            title="Easy"
            content="By default, the dev server (dev command) runs in development mode and the build command runs in production mode. This means when running vite build, it will load the env variables from .env.production if there is one:"
          />
          <CarouselItemComponent
            imageUrl={"https://picsum.photos/200"}
            title="Easy"
            content="By default, the dev server (dev command) runs in development mode and the build command runs in production mode. This means when running vite build, it will load the env variables from .env.production if there is one:"
          />
          <CarouselItemComponent
            imageUrl={"https://picsum.photos/200"}
            title="Easy"
            content="By default, the dev server (dev command) runs in development mode and the build command runs in production mode. This means when running vite build, it will load the env variables from .env.production if there is one:"
          />
        </Carousel>
      </div> */}
    </div>
  );
};

export default HomePage;
