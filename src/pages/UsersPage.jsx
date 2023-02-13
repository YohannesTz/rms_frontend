import React from "react";
import notFoundAnimation from "../assets/unauthorized_error.json";
import unAuthorizedAnimation from "../assets/unauthorized_error.json";
import Lottie from "lottie-react";
import util from "../util/util.json";
import { useAuthStore } from "../store/authStore";
import { Button } from "flowbite-react";

const style = {
  height: 350,
  width: 350,
};

const UsersPage = () => {
  const baseUrl = util.baseUrl;
  const authData = useAuthStore((state) => state.authData);

  if (Object.keys(authData).length == 0 || authData.role != "talent") {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <div className="flex flex-row justify-center">
            <Lottie
              animationData={unAuthorizedAnimation}
              style={style}
              loop={true}
            />
          </div>

          <p className="text-2xl text-gray-800 text-center">
            Oops! seems like your are not allowed to see this page
          </p>
          <div className="flex flex-row my-6 justify-center">
            <div className="py-0">
              <Button size="xs" pill href="/get-started">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>UsersPage</div>;
};

export default UsersPage;
