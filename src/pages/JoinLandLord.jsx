import React, { useState } from "react";
import {
  Label,
  TextInput,
  Button,
  Select,
  Textarea,
  Spinner,
  Modal,
} from "flowbite-react";
import { VisiblityButton } from "../components/VisiblityButton";
import PasswordStrengthBar from "react-password-strength-bar";
import { BsFillCheckCircleFill, BsFillXOctagonFill } from "react-icons/bs";
import axios from "axios";
import util from "../util/util.json";
import { useNavigate } from "react-router-dom";

const JoinLandLord = () => {
  let navigate = useNavigate();
  const baseUrl = util.baseUrl;
  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phonenumber: "",
    bio: "",
    role: "lord",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [emailError, setEmailError] = useState("Please enter a vlaid email!");
  const [phoneError, setPhoneError] = useState(
    "Please enter a vlaid phone number!"
  );

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleInputChange = (e) => {
    const { value } = e.target;

    if (
      formValues.password.length + 1 >= 8 &&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email) &&
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
        formValues.phonenumber
      )
    ) {
      console.log("check is successfull");
      setIsSubmitDisabled(true);
    } else {
      console.log("check is not successfull");
      setIsSubmitDisabled(false);
    }

    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email) ||
      formValues.email === ""
    ) {
      setEmailError("Please enter a valid email");
      console.log("email is not valid");
    } else {
      setEmailError("");
      console.log("email valid");
    }

    if (
      formValues.phonenumber === "" ||
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
        formValues.phonenumber
      )
    ) {
      setPhoneError("");
      console.log("phone number not valid");
    } else {
      setPhoneError("Please enter a valid phone number");
      console.log("phone num valid");
    }
    setFormValues({
      ...formValues,
      [e.target.id]: value,
    });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    setIsLoading(true);

    axios
      .post(baseUrl + "/api/users/signUp", formValues)
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
      navigate("/signIn");
    }
  };

  const handlePasswordVisiblity = (e) => {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div>
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
      <div className="flex flex-row flex-wrap my-6 justify-center">
        <div className="text-gray-800 text-left whitespace-break-normal justify-center ">
          <p className="text-3xl">Hi Please fill in...</p>
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <div className="sm:w-3/5 lg:3/5 md:w-3/5">
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="Please input your email here "
                value={formValues.email}
                onChange={handleInputChange}
                required={true}
              />
              <p className="text-red-400 2xl mt-2">{emailError}</p>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <div className="flex flex-row">
                <TextInput
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Please input password here"
                  className="grow"
                  required={true}
                  value={formValues.password}
                  onChange={handleInputChange}
                />
                <div className="pl-1">
                  <VisiblityButton
                    isVisible={isPasswordVisible}
                    onChecked={handlePasswordVisiblity}
                  />
                </div>
              </div>
              <PasswordStrengthBar password={formValues.password} />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="firstName" value="First Name" />
              </div>
              <TextInput
                id="firstName"
                type="text"
                placeholder="Your First Name"
                required={false}
                value={formValues.firstName}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="lastName" value="Last Name" />
              </div>
              <TextInput
                id="lastName"
                type="text"
                placeholder="Your Last Name"
                required={false}
                value={formValues.lastName}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="phonenumber" value="Your PhoneNumber" />
              </div>
              <TextInput
                id="phonenumber"
                type="phonenumber"
                placeholder="Please input your phone number here"
                required={true}
                value={formValues.phonenumber}
                onChange={handleInputChange}
              />
              <p className="text-red-400 2xl mt-2">{phoneError}</p>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="bio" value="Your Bio" />
              </div>
              <Textarea
                id="bio"
                type="text"
                placeholder="Please input your Organization description"
                required={true}
                rows={3}
                value={formValues.bio}
                onChange={handleInputChange}
              />
            </div>

            {isLoading ? (
              <div className="flex flex-row justify-center">
                <Spinner></Spinner>
              </div>
            ) : (
              <Button
                size="xs"
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
              >
                Submit
              </Button>
            )}
            <div className="flex flex-row justify-center">
              <p className="text-gray-800">
                Already SignedUp?{" "}
                <a
                  href="/signIn"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinLandLord;
