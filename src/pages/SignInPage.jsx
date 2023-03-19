import React, { useEffect, useState } from "react";
import { Label, TextInput, Button, Spinner, Modal } from "flowbite-react";
import { useAuthStore } from "../store/authStore";
import { BsFillCheckCircleFill, BsFillXOctagonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { VisiblityButton } from "../components/VisiblityButton";
import util from "../util/util.json";
import axios from "axios";

const SignInPage = () => {
  let navigate = useNavigate();
  const baseUrl = util.baseUrl;
  const authData = useAuthStore((state) => state.authData);
  const setAuthData = useAuthStore((state) => state.setAuthData);

  const initialValues = {
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { value } = e.target;

    setFormValues({
      ...formValues,
      [e.target.id]: value,
    });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formValues);

    axios
      .post(baseUrl + "/api/users/login", formValues)
      .then((response) => {
        console.log(response);
        setResult(response.data);
        setIsLoading(false);
        setShowDialog(true);
        console.log(result.success);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const onClose = () => {
    setShowDialog(false);

    if (result.success) {
      let authData = {
        authenticated: true,
        ...result.data,
      };

      setAuthData(authData);

      if (authData.role == "client") {
        navigate("/");
      } else if (authData.role == "lord") {
        navigate("/client-view");
      } else if (authData.role == "admin") {
        navigate("/admin-view");
      }
    }
  };

  useEffect(() => {
    if (Object.keys(authData).length > 0 && authData.role === "client") {
      console.log("redirecting client...");
      navigate("/client-view");
    } else if (Object.keys(authData).length > 0 && authData.role === "lord") {
      console.log("redirecting lord...");
      navigate("/lord-view");
    } else if (Object.keys(authData).length > 0 && authData.role === "admin") {
      console.log("redirecting admin...");
      navigate("/admin-view");
    }
  }, []);

  return (
    <div>
      <div className="flex flex-row flex-wrap my-6 justify-center">
        <div className="text-gray-800 text-left whitespace-break-normal justify-center ">
          <p className="text-2xl">SignIn</p>
        </div>
      </div>
      <Modal show={showDialog} size="md" popup={true} onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {result.success ? (
              <div>
                <BsFillCheckCircleFill className="mx-auto mb-4 h-14 w-14 text-gray-600 " />
                <h3 className="mb-5 text-lg font-normal text-gray-600 ">
                  Success!
                </h3>
              </div>
            ) : (
              <div>
                <BsFillXOctagonFill className="mx-auto mb-4 h-14 w-14 text-gray-600 " />
                <h3 className="mb-5 text-lg font-normal text-gray-600 ">
                  {typeof result.error == "undefined"
                    ? " Unknwon error! "
                    : result.error.message}
                </h3>
              </div>
            )}
            <div className="flex justify-center gap-4">
              <Button color="gray" pill size="xs" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="flex flex-row justify-center px-5 lg:px-56 md:px-30 sm:px-14 ">
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="Please input your email here "
              required={true}
              value={formValues.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>

            <div className="flex flex-row items-center my-2">
              <TextInput
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Please input password here"
                required={true}
                className="grow"
                value={formValues.password}
                onChange={handleInputChange}
              />
              <div className="pl-1">
                <VisiblityButton
                  isVisible={showPassword}
                  onChecked={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                />
              </div>
            </div>
          </div>
          {isLoading ? (
            <div className="flex flex-row justify-center">
              <Spinner></Spinner>
            </div>
          ) : (
            <Button onClick={handleSubmit}>SignIn</Button>
          )}
          <div className="flex flex-row justify-center">
            <p className="text-gray-800">
              No account?{" "}
              <a
                href="/join-client"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
