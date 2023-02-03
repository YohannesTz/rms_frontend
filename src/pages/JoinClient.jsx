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

const JoinClient = () => {
  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phonenumber: "",
    bio: "",
    role: "client"
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
        formValues.phoneNo
      )
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }

    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email) ||
      formValues.email === ""
    ) {
      setEmailError("Please enter a valid email");
      console.log("email valid");
    } else {
      setEmailError("");
      console.log("email not valid");
    }

    if (
      formValues.phoneNo === "" ||
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
        formValues.phoneNo
      )
    ) {
      setPhoneError("Please enter a valid phone number");
      console.log("phone number valid");
    } else {
      setPhoneError("");
      console.log("phone num not valid");
    }
    setFormValues({
      ...formValues,
      [e.target.id]: value,
    });
    console.log(formValues);
  };

  const handleSubmit = () => {};

  const onClose = () => {
    setShowDialog(false);
    if (result.success) {
      navigate("/client-signin");
    }
  };

  const handlePasswordVisiblity = (e) => {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div>
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
                <Label htmlFor="email" value="Your organization email" />
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
                <Label htmlFor="phoneNo" value="Your PhoneNumber" />
              </div>
              <TextInput
                id="phoneNo"
                type="phoneNo"
                placeholder="Please input your phone number here"
                required={true}
                value={formValues.phonenumber}
                onChange={handleInputChange}
              />
              <p className="text-red-400 2xl mt-2">{phoneError}</p>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Your Bio" />
              </div>
              <Textarea
                id="description"
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

export default JoinClient;
